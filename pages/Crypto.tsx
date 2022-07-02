import React, { useState, useEffect, useRef } from "react";
import { connectToDatabase } from "../util/connectMongoDB";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import formatGraphData from "../util/formatgraphtime";
import formatNums from "../util/formatNums";
import buyCoin from "../util/buyCoin";
import { DateTime } from "luxon";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useSession } from "next-auth/client";

const Crypto = ({ coinData }) => {
  const [graphData, setGraphData] = useState(null);
  const [currentCoin, setCurrentCoin] = useState(null);
  const [coinToBuy, setCoinToBuy] = useState(null);

  const [session, loadingSession] = useSession();

  const selectedCurrentCoin = useRef(null);

  const defaultCoin = {
    name: "Bitcoin",
  };

  useEffect(() => {
    coinGraph(defaultCoin);
  }, []);

  const coinToBuyHandler = (event, currentCoin) => {
    let desiredCoinValueUSD = event;
    let desiredCoinToBuy = currentCoin.name;
    let desiredCoinAmount = desiredCoinValueUSD / currentCoin?.price_usd;
    if (currentCoin) {
      setCoinToBuy({
        coinName: desiredCoinToBuy,
        coinAmount: desiredCoinAmount.toFixed(7),
        coinAmountUSD: desiredCoinValueUSD,
      });
    }
  };

  const coinGraph = async (coin) => {
    const encodedString = encodeURIComponent(coin.name);
    const data = await fetch(
      `http://localhost:3000/api/search?term=${encodedString}`
    );

    const responseGraph = await data.json().then((responseGraph) => {
      if (coinToBuy === null && responseGraph[0]) {
        setCoinToBuy(responseGraph[0]);
      }
      setGraphData(formatGraphData(responseGraph));
    });
  };

  const CoinChart = () => {
    return (
      <ResponsiveContainer
        width='100%'
        className='chart'
        height='100%'
        aspect={2}
      >
        <AreaChart
          data={graphData}
          margin={{ top: 0, right: 40, bottom: 0, left: 40 }}
        >
          <defs>
            <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#2451B7' stopOpacity={0.4} />
              <stop offset='75%' stopColor='#2451B7' stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            dataKey='price_usd'
            stroke='rgb(152, 191, 100)'
            fill='rgb(152, 191, 100, .3)'
          />

          <XAxis dataKey='time' axisLine={false} tickLine={false} />

          <YAxis
            dataKey='price_usd'
            axisLine={false}
            tickLine={false}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
            domain={["dataMin", "auto"]}
          />
          <Tooltip />
          <Legend />

          <CartesianGrid opacity={0.5} />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <section id='crypto-page'>
      <section id='crypto-responsive-container' className='d-flex pt-5'>
        <div className='d-flex justify-content-center chart-container'>
          <CoinChart />
        </div>
        <div className='d-flex flex-column w-100 coin-stats-container'>
          <div id='coin-stats'>
            <h2 className='coin-name text-center'>
              {selectedCurrentCoin.current?.name
                ? selectedCurrentCoin.current.name
                : coinToBuy?.name}
            </h2>
            <div className='d-flex flex-row justify-content-between'>
              <h2 className='coin-value'>Value $</h2>
              <h2>
                {selectedCurrentCoin.current?.price_usd
                  ? selectedCurrentCoin.current.price_usd
                  : coinToBuy?.price_usd}
              </h2>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <h2 className='coin-rank'>Rank</h2>
              <h2>
                {selectedCurrentCoin.current?.rank
                  ? selectedCurrentCoin.current.rank
                  : coinToBuy?.rank}
              </h2>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <h2 className='coin-7-day'>7 Day Diff </h2>
              <h2>
                {selectedCurrentCoin.current?.percent_change_7d
                  ? `${selectedCurrentCoin.current.percent_change_7d}%`
                  : `${coinToBuy?.percent_change_7d}%`}
              </h2>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <h2 className='coin-value'>24 Hour Diff</h2>
              <h2>
                {selectedCurrentCoin.current?.percent_change_24h
                  ? `${selectedCurrentCoin.current.percent_change_24h}%`
                  : `${coinToBuy?.percent_change_24h}%`}
              </h2>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <h2 className='coin-rank'>Market Cap</h2>
              <h2>
                {selectedCurrentCoin.current?.market_cap_usd
                  ? formatNums(selectedCurrentCoin.current.market_cap_usd)
                  : formatNums(coinToBuy?.market_cap_usd)}
              </h2>
            </div>
            <div className='d-flex flex-row justify-content-between'>
              <h2 className='coin-7-day'>Volume 24H </h2>
              <h2>
                {selectedCurrentCoin.current?.volume24a
                  ? `${formatNums(selectedCurrentCoin.current.volume24a)}`
                  : `${formatNums(coinToBuy?.volume24a)}`}
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section
        id='buy-section-container'
        className='d-flex flex-row justify-content-center w-100'
      >
        <div className='d-flex flex-row align-items-start'>
          <div className='d-flex flex-row buy-section'>
            <Dropdown>
              <Dropdown.Toggle id='dropdown-button-dark' variant='secondary'>
                {currentCoin ? currentCoin : defaultCoin.name}
              </Dropdown.Toggle>

              <Dropdown.Menu variant='dark' className='crypto-dropdown-menu'>
                {coinData.map((coin) => {
                  return (
                    <Dropdown.Item key={`${coin._id}`}>
                      <h2
                        onClick={() => {
                          coinGraph(coin);
                          setCurrentCoin(coin.name);
                          selectedCurrentCoin.current = coin;
                        }}
                      >
                        {coin.name}
                      </h2>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <input
              className=''
              placeholder='Enter USD amount'
              type='number'
              min='0'
              onChange={(event) =>
                coinToBuyHandler(
                  event.target.value,
                  selectedCurrentCoin.current
                )
              }
            ></input>
          </div>

          <div className='d-flex flex-row justify-content-center'></div>
        </div>
        <div className=''>
          <h5 className='text-center'>
            {/* {coinToBuy?.coinAmount} {coinToBuy.coinName} */}
          </h5>
          <h5 className='text-center'>
            {coinToBuy?.coinAmount} {coinToBuy?.coinName}
          </h5>
        </div>

        <div className='d-flex flex-column'>
          <button
            className='button-primary'
            onClick={() => buyCoin(coinToBuy, session, "buy")}
          >
            Buy
          </button>
          <button
            className='button-primary'
            onClick={() => buyCoin(coinToBuy, session, "sell")}
          >
            sell
          </button>
        </div>
      </section>
    </section>
  );
};

export default Crypto;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db
    .collection("coins")
    .find({})
    .sort({ time: -1 })
    .limit(100)
    .toArray();

  const coins = JSON.parse(JSON.stringify(data));
  coins.sort((a, b) => a.rank - b.rank);

  return {
    props: {
      coinData: coins,
    },
  };
}
