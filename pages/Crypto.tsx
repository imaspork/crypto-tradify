import React, { useState, useEffect } from "react";
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
} from "recharts";

import { DateTime } from "luxon";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Crypto = ({ coinData }) => {
  const [graphData, setGraphData] = useState(null);
  const [currentCoin, setCurrentCoin] = useState(null);

  // console.log(coinData);
  // add user to function
  const buyCoin = async (coin) => {
    const data = await fetch(
      `http://localhost:3000/api/user?coin_name=${coin.name}&user=test`
    );

    const response = await data.json();
    // console.log(response);
  };

  const coinGraph = async (coin) => {
    const encodedString = encodeURIComponent(coin.name);
    // console.log(encodedString);
    const data = await fetch(
      `http://localhost:3000/api/search?term=${encodedString}`
    );

    const responseGraph = await data.json().then((responseGraph) => {
      for (let i = 0; i < responseGraph.length; i++) {
        const dt = DateTime.fromISO(responseGraph[i].time);
        responseGraph[i].time = new Date(dt).toLocaleString(DateTime.DATE_MED);
      }
      setGraphData(responseGraph);
    });
  };

  return (
    <section>
      <div className='d-flex flex-row flex-wrap p-5'>
        <Dropdown>
          <Dropdown.Toggle
            id='dropdown-button-dark-example1'
            variant='secondary'
          >
            {currentCoin ? currentCoin : "Select a Cryptocurrency"}
          </Dropdown.Toggle>

          <Dropdown.Menu variant='dark' className='crypto-dropdown-menu'>
            {coinData.map((coin) => {
              return (
                <Dropdown.Item key={coin.coinId}>
                  <h2
                    onClick={() => {
                      coinGraph(coin);
                      setCurrentCoin(coin.name);
                    }}
                  >
                    {coin.name}
                  </h2>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <hr></hr>
      <section className='coin-graph-container'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={300}
            data={graphData ? graphData : [{}]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='time' />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type='monotone' dataKey='price_usd' stroke='#82ca9d' />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </section>
  );
};

export default Crypto;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("coins").find({}).limit(101).toArray();

  const coins = JSON.parse(JSON.stringify(data));

  // console.log(coins);

  return {
    props: {
      coinData: coins,
    },
  };
}
