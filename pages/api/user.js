import { connectToDatabase } from "../../util/connectMongoDB";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = req.query;

  // checking user collection for associated email. If it exists, we return response body. The only important value is to watch for matchedCount to equal 0. This means the user is new.
  // We can then serve a page to them to choose a USD amount to start. If the account does not exist, we set default values to the email and create the document. USDHeld will be altered later.
  const response = await db.collection("users").findOneAndUpdate(
    { email: data.email },
    {
      $setOnInsert: {
        email: data.email,
        userName: data.email,
        USDHeld: parseInt(0),
        dateCreated: new Date(),
        coinsHeld: {
          transactionHistory: [],
          currentHeld: {},
        },
        userId: 1,
        isNew: true,
      },
    },
    { upsert: true }
  );

  res.status(200).json({ response });
}
