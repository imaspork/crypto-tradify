import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Router, { useRouter } from "next/router";

const Homepage = () => {
  const [session, loadingSession] = useSession();

  useEffect(() => {
    console.log(session);
    if (session?.isNew === true) {
      Router.push("/NewUser", undefined, { shallow: true });
    }
  }, [session]);

  return (
    <section
      id='home-page'
      className='d-flex flex-row justify-content-center align-items-center'
    >
      <div className='d-flex flex-column align-items-center'>
        <h1 className='welcome-h1'>Welcome.</h1>
        <Link href='/Account'>
          <a>
            <button className='button-primary mt-3 homepage-button'>
              {session ? "Account Page" : "Sign Up"}
            </button>
          </a>
        </Link>
        <Link href='/Crypto'>
          <a>
            <button className='button-primary mt-3 homepage-button'>
              Buy Crypto
            </button>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
