import { connectToDatabase } from "../../util/connectMongoDB";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = req.query;

  try {
    const response = await db
      .collection("users")
      .deleteOne({ email: data.email });

    if (response.deletedCount === 0) {
      res.status(404).json({ response });
    } else {
      res.status(200).json({ response });
    }
  } catch (err) {
    res.status(500).end();
    console.log(err);
  }
}
