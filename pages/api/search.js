import { connectToDatabase } from "../../util/connectMongoDB";
import { MongoClient } from "mongodb";

export default async function getCoins(req, res) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("coins")
    .find({ name: req.query.term }, { price_usd: 1, time: 1, name: 1, rank: 0 })
    .limit(25)
    .toArray();
  res.json(data);
}
