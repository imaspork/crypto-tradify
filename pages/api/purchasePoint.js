import { connectToDatabase } from "../../util/connectMongoDB";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const data = req.query;

    const userEmail = data.user_email;
    const coinName = data.coin_name;
    const coinAmount = data.coin_amount;
    const USDCoinAmount = data.usd_coin_amount;

    // make request to mongodb to retrieve userCoin object
    // make sure that user USD is greater than amount trying to purchase (break if it is not)
    // increment and modify coin object to reflect changes

    const userData = await db.collection("users").findOne({ email: userEmail });

    const changeCoinsRes = await db.collection("users").updateOne(
      { email: userEmail },
      {
        $inc: {
          ["coinsHeld." + coinName]: parseInt(coinAmount),
          USDHeld: parseInt(USDCoinAmount * -1),
        },
      },
      { upsert: true }
    );
    console.log(changeCoinsRes);
    // modify coins object to have decimals

    res.status(200);
    res.json(changeCoinsRes).end();
  } catch (err) {
    res.status(500).end();
  }
}
