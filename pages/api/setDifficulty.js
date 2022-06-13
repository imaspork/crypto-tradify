import { connectToDatabase } from "../../util/connectMongoDB";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    const data = req.query;
    const response = await db.collection("users").updateOne(
      { email: data.user_email },
      {
        $inc: { USDHeld: parseInt(data.amount) },
      },
      { upsert: true }
    );

    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ response });
  }
}
