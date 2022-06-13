import { useSession } from "next-auth/client";
import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";

const NewUser = () => {
  const [session, loadingSession] = useSession();

  useEffect(() => {
    if (session?.isNew !== true) {
      Router.push("/NewUser", undefined, { shallow: true });
    }
  }, []);

  const setDollarAmount = async (amount) => {
    const data = await fetch(
      `http://localhost:3000/api/setDifficulty?user_email=${session.user.email}&amount=${amount}`
    );
    const response = await data.json().then(() => {
      Router.push("/Crypto", undefined, { shallow: true });
    });
  };

  const difficultyLevel = {
    Easy: 500000,
    Medium: 250000,
    Hard: 50000,
    Masochist: 10000,
  };

  return (
    <React.Fragment>
      <section
        id='user-choice-container'
        className='d-flex flex-row justify-content-center'
      >
        <div
          id='difficulty-card-container'
          className='d-flex flex-row flex-wrap justify-content-center align-items-center'
        >
          <div id='difficulty-title'>
            <h2>
              Please choose a dollar amount to start. This is the <b>only </b>
              time you may do this.
            </h2>
          </div>

          {Object.keys(difficultyLevel).map((difficulty, amount) => {
            return (
              <div
                className='difficulty-card d-flex flex-column justify-content-around align-items-center'
                key={amount}
              >
                <h2>{difficulty}</h2>
                <h2>${difficultyLevel[difficulty].toLocaleString("en-US")}</h2>
                <button
                  className='button-secondary'
                  onClick={() => setDollarAmount(difficultyLevel[difficulty])}
                >
                  Set difficulty
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
};

export default NewUser;
