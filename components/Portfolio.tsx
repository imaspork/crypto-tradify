import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import formatNums from "../util/formatNums";
import getUserData from "../util/getUserData";

const Portfolio = () => {
  const [session, loadingSession] = useSession();
  const [userPortfolioData, setUserPortfolioData] = useState(null);
  const userPortfolioCoins =
    userPortfolioData?.userData?.coinsHeld?.currentHeld;

  useEffect(() => {
    getUserData(session?.user?.email).then((response) => {
      setUserPortfolioData({ userData: response.response.value });
    });
  }, [session]);

  return (
    <section>
      {userPortfolioData !== null ? (
        <div>
          <h2>
            Liquid cash: ${formatNums(userPortfolioData?.userData?.USDHeld)}
          </h2>
          <h2>Owned coins: </h2>
          <div>
            {userPortfolioCoins ? (
              <React.Fragment>
                {Object.keys(userPortfolioCoins).map((coin, coinAmount) => {
                  return (
                    <h2 key={coin}>
                      {coin}: {userPortfolioCoins[coin]}
                    </h2>
                  );
                })}
              </React.Fragment>
            ) : null}
          </div>
        </div>
      ) : (
        <h2>Loading portfolio...</h2>
      )}
    </section>
  );
};

export default Portfolio;
