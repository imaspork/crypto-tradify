import { connectToDatabase } from "../../util/connectMongoDB";
import { MongoClient } from "mongodb";

export default async function getCoins(req, res) {
  const { db } = await connectToDatabase();

  const data = await db.collection("coins").find({}).limit(101).toArray();
  console.log(data);
  res.json(data);
}
