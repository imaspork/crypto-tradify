var cron = require("node-cron");
const axios = require("axios").default;
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

function getDailyCryptoData() {
  axios
    .get("https://api.coinlore.net/api/tickers/?start=100&limit=100")
    .then((response) => {
      const convertedData = JSON.stringify(response.data.data);
      console.log(convertedData);
      return convertedData;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateDB() {
  const client = new MongoClient(process.env.mongoURI);
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

cron.schedule("*/10 * * * * *", () => {
  // getDailyCryptoData();
  console.log("test!!!!");
});

updateDB();

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
