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

    // modify this to include USD cost at purchase

    const userData = await db.collection("users").findOne({ email: userEmail });
    const changeCoinsRes = await db.collection("users").updateOne(
      { email: userEmail },
      {
        $inc: {
          ["coinsHeld." + coinName]: parseFloat(coinAmount),
          USDHeld: parseInt(USDCoinAmount * -1),
        },
      },
      { upsert: true }
    );
    res.status(200);
    res.json(changeCoinsRes).end();
  } catch (err) {
    res.status(500).end();
  }
}
