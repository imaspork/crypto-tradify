import { connectToDatabase } from "../../util/connectMongoDB";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = req.query;
  console.log(data);

  const response = await db.collection("users").findOne({ email: data.email });
  console.log(response);

  res.status(200).json({ response });
}
