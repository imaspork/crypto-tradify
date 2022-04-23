import { Schema, model, models } from "mongoose";

const coinSchema = new Schema({
  coinId: String,
  symbol: String,
  name: String,
  nameId: String,
  rank: Number,
  price_usd: String,
  percent_change_24h: String,
  percent_change_7d: String,
  price_btc: String,
  market_cap_usd: String,
  volume24: Number,
  volume24a: Number,
  csupply: String,
  tsupply: String,
  time: { type: Date, default: Date.now },
});

const Coin = models.coinSchema;

export default Coin;
