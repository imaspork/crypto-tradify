import { connectToDatabase } from "../../util/connectMongoDB";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = req.query;
  // check for user, add, otherwise make use then add
  const response = await db.collection("users").insertOne(data);

  res.json(response);
}
