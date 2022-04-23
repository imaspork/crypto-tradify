const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Coin", coinSchema);
