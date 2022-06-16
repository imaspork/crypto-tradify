import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Router, { useRouter } from "next/router";

const Homepage = () => {
  const [session, loadingSession] = useSession();

  useEffect(() => {
    if (session?.isNew === true) {
      Router.push("/NewUser", undefined, { shallow: true });
    }
  }, [session]);

  const RenderButtonsOnSession = () => {
    if (session) {
      return (
        <React.Fragment>
          <Link href='/Crypto'>
            <a>
              <button className='button-primary mt-3 homepage-button'>
                Buy Crypto
              </button>
            </a>
          </Link>
          <Link href='/Account'>
            <a>
              <button className='button-primary mt-3 homepage-button'>
                Account
              </button>
            </a>
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link href='/Account'>
            <a>
              <button className='button-primary mt-3 homepage-button'>
                Get started
              </button>
            </a>
          </Link>
        </React.Fragment>
      );
    }
  };

  return (
    <section
      id='home-page'
      className='d-flex flex-row justify-content-center align-items-center'
    >
      <div id='tagline'>
        <h1>
          <b>Buy, Sell, and Hold the top 100 Cryptocurrencies (simulated)</b>{" "}
        </h1>
      </div>
      <div className='d-flex flex-column align-items-center'>
        <RenderButtonsOnSession />
      </div>
    </section>
  );
};

export default Homepage;
