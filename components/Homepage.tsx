import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";

const Homepage = () => {
  const [session, loadingSession] = useSession();

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
      className='d-flex flex-column align-items-center justify-content-center'
    >
      <div className='d-flex flex-column text-center'>
        <h1>
          <b>Trade with confidence.</b>
        </h1>
        <h2>Simulated cryptocurrency trading</h2>
      </div>

      <div className='d-flex flex-column align-items-center pt-5'>
        <RenderButtonsOnSession />
      </div>
    </section>
  );
};

export default Homepage;
