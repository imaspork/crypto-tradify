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
import { DateTime } from "luxon";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Crypto = ({ coinData }) => {
  const [graphData, setGraphData] = useState(null);
  const [currentCoin, setCurrentCoin] = useState("Select a Cryptocurrency");

  const testRef = useRef(null);

  const buyCoin = async (coin) => {
    const data = await fetch(
      `http://localhost:3000/api/user?coin_name=${coin.name}&user=test`
    );
    const response = await data.json();
  };

  const coinGraph = async (coin) => {
    const encodedString = encodeURIComponent(coin.name);
    const data = await fetch(
      `http://localhost:3000/api/search?term=${encodedString}`
    );

    const responseGraph = await data.json().then((responseGraph) => {
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

  const LineGraphChart = () => {
    return (
      <ResponsiveContainer
        width='100%'
        className='chart'
        height='100%'
        aspect={2}
      >
        <LineChart
          data={graphData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='1' />
          <XAxis dataKey='time' />
          <YAxis
            dataKey='price_usd'
            tickFormatter={(number) => `$${number.toFixed(2)}`}
            domain={["dataMin", "auto"]}
          />
          <Tooltip />
          <Legend />

          <Line
            type='monotone'
            dataKey='price_usd'
            stroke='#82ca9d'
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <section id='crypto-page'>
      <section className='d-flex flex-row pt-5'>
        <div className='d-flex justify-content-center chart-container'>
          {/* <CoinChart /> */}
          <LineGraphChart />
        </div>
        <div>
          <div className='d-flex flex-column'>
            <div id='coin-stats'>
              <h2 className='coin-name'>
                {testRef.current?.name ? testRef.current.name : null}
              </h2>
              <div className='d-flex flex-row justify-content-between'>
                <h2 className='coin-value'>Value $</h2>
                <h2>
                  {testRef.current?.price_usd
                    ? testRef.current.price_usd
                    : null}
                </h2>
              </div>
              <div className='d-flex flex-row justify-content-between'>
                <h2 className='coin-rank'>Rank</h2>
                <h2>{testRef.current?.rank ? testRef.current.rank : null}</h2>
              </div>
              <div className='d-flex flex-row justify-content-between'>
                <h2 className='coin-7-day'>7 Day Diff </h2>
                <h2>
                  {testRef.current?.percent_change_7d
                    ? testRef.current.percent_change_7d
                    : null}
                  %
                </h2>
              </div>
            </div>
            <div className='d-flex flex-row'>
              <Dropdown className='m-1'>
                <Dropdown.Toggle
                  id='dropdown-button-dark-example1'
                  variant='secondary'
                >
                  {currentCoin ? currentCoin : "Select a Cryptocurrency"}
                </Dropdown.Toggle>

                <Dropdown.Menu variant='dark' className='crypto-dropdown-menu'>
                  {coinData.map((coin) => {
                    return (
                      <Dropdown.Item key={`${coin._id}`}>
                        <h2
                          onClick={() => {
                            coinGraph(coin);
                            setCurrentCoin(coin.name);
                            testRef.current = coin;
                            console.log(testRef.current.coinId);
                          }}
                        >
                          {coin.name}
                        </h2>
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <input className='m-1'></input>
            </div>
          </div>
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
  // console.log(coins);

  return {
    props: {
      coinData: coins,
    },
  };
}
