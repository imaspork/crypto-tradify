var cron = require("node-cron");
const axios = require("axios").default;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Coin = require("./schemas/coin");
/**
 * Fetches coin API to get top 100 coins
 */
function getDailyCryptoData() {
  axios
    .get("https://api.coinlore.net/api/tickers/?start=0&limit=100")
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
/**
 *
 * @param response - coin API response data
 * On success, this function loops through the response object and creates a new coin and saves it to the db.
 */
async function onSuccess(response) {
  const currentCoinStats = response.data.data;
  for (let i = 0; i < currentCoinStats.length; i++) {
    let newCoin = new Coin({
      coinId: currentCoinStats[i].id,
      symbol: currentCoinStats[i].symbol,
      name: currentCoinStats[i].name,
      nameId: currentCoinStats[i].nameId,
      rank: currentCoinStats[i].rank,
      price_usd: currentCoinStats[i].price_usd,
      percent_change_24h: currentCoinStats[i].percent_change_24h,
      percent_change_7d: currentCoinStats[i].percent_change_7d,
      price_btc: currentCoinStats[i].price_btc,
      market_cap_usd: currentCoinStats[i].market_cap_usd,
      volume24: currentCoinStats[i].volume24,
      volume24a: currentCoinStats[i].volume24a,
      csupply: currentCoinStats[i].csupply,
      tsupply: currentCoinStats[i].tsupply,
    });

    await newCoin.save();

    console.log(`new coin ${newCoin.name} is saved!`);

    if (i === currentCoinStats.length - 1) {
      console.log(`${currentCoinStats.length} coins saved.`);
    }
  }
}

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

getDailyCryptoData();
cron.schedule("0 0 0 * * *", () => {
  console.log("saving crypto coins from top 100");
  getDailyCryptoData();
});
