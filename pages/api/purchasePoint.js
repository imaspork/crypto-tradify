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
    const transactionType = data.transaction_type;

    if (transactionType === "buy") {
      const userData = await db
        .collection("users")
        .findOne({ email: userEmail })
        .then((userData) => {
          updateUserBuy(userData);
        });
    }

    if (transactionType === "sell") {
      const userData = await db
        .collection("users")
        .findOne({ email: userEmail })
        .then((userData) => {
          updateUserSell(userData);
        });
    }

    async function updateUserBuy(userInfo) {
      if (userInfo.USDHeld - USDCoinAmount < 0) {
        console.log("Youre out of monies");
        return { response: "Out of money" };
      }
      let userDataUpdateResponse = await db.collection("users").updateOne(
        { email: userEmail },
        {
          $push: {
            ["coinsHeld.transactionHistory"]: {
              coinName: coinName,
              coinAmount: coinAmount,
              transactionTotal: USDCoinAmount,
              transactionTime: new Date(),
              transactionType: transactionType,
              USDHeldBeforeTransaction: userInfo.USDHeld,
              USDHeldAfterTransaction: parseInt(
                userInfo.USDHeld - USDCoinAmount
              ),
            },
          },
          $inc: {
            ["coinsHeld.currentHeld." + coinName]: parseFloat(coinAmount),
            USDHeld: parseInt(USDCoinAmount * -1),
          },
        },
        { upsert: true }
      );
      console.log(userDataUpdateResponse);
      return userDataUpdateResponse;
    }

    async function updateUserSell(userInfo) {
      const userSellObject = {
        coinName: coinName,
        coinAmount: coinAmount,
        transactionTotal: USDCoinAmount,
        transactionTime: new Date(),
        transactionType: transactionType,
        USDHeldBeforeTransaction: userInfo.USDHeld,
        USDHeldAfterTransaction: parseInt(USDCoinAmount) + userInfo.USDHeld,
      };

      const userCoinCountToSell = userInfo?.coinsHeld?.currentHeld[coinName];
      const newCoinCount = userCoinCountToSell - coinAmount;
      if (userCoinCountToSell >= coinAmount) {
        console.log(
          `User wants to sell ${coinAmount} of ${coinName} and they have ${userCoinCountToSell} being held in portfolio`
        );
        console.log(newCoinCount, "sell");
        userDataUpdateResponse();
      } else {
        // return something here?
      }
      // function used to sell coins if possibility is true
      async function userDataUpdateResponse() {
        await db.collection("users").updateOne(
          { email: userEmail },
          {
            $push: {
              ["coinsHeld.transactionHistory"]: {
                coinName: coinName,
                coinAmount: coinAmount,
                transactionTotal: USDCoinAmount,
                transactionTime: new Date(),
                transactionType: transactionType,
                USDHeldBeforeTransaction: userInfo.USDHeld,
                USDHeldAfterTransaction:
                  parseInt(USDCoinAmount) + userInfo.USDHeld,
              },
            },
            $inc: {
              ["coinsHeld.currentHeld." + coinName]:
                parseFloat(coinAmount) * -1,
              USDHeld: parseInt(USDCoinAmount * 1),
            },
          },

          { upsert: true }
        );
        console.log(userDataUpdateResponse);
        return userDataUpdateResponse;
      }
    }
    // handle responses
    res.statusCode = 200;
    // modify return response later
    res.end(JSON.stringify(userDataUpdateResponse));
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
