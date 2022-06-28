import { useSession, signIn, signOut, getSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import googleImg from "../public/brands/google/google-logo.png";
import githubImg from "../public/brands/GitHub-Mark-64px.png";
import Image from "next/image";
import NewUser from "../components/NewUser";
import checkIsNotNew from "../util/checkisNotNew";
import Link from "next/link";

export default function SignUp() {
  const [session, loadingSession] = useSession();
  const [userState, setUserState] = useState([]);

  const signInHandler = (provider) => {
    signIn(provider);
  };

  return (
    <React.Fragment>
      {session?.isNew === true && checkIsNotNew() === false ? (
        <NewUser session={session} />
      ) : null}
      <section
        id='account-page'
        className='d-flex flex-row justify-content-center'
      >
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div>
            {!session && (
              <React.Fragment>
                <h2 className='text-center'>Sign in</h2>
                <div className='d-flex flex-row'>
                  <button
                    className='d-flex flex-col align-items-center  login-wrapper-button '
                    onClick={() => signInHandler("google")}
                  >
                    <Image
                      src={googleImg}
                      width={40}
                      height={40}
                      alt='google log in image'
                    />
                    <span>Login with Google</span>
                  </button>

                  <button
                    className='d-flex flex-col align-items-center  login-wrapper-button '
                    onClick={() => signInHandler("github")}
                  >
                    <Image
                      src={githubImg}
                      width={40}
                      height={40}
                      alt='github login image'
                    />
                    <span>Login with GitHub</span>
                  </button>
                </div>
              </React.Fragment>
            )}

            {session && (
              <>
                <h4>Welcome back {session.user.name}</h4>

                <div>
                  <h4>Email: {session.user.email}</h4>
                  <br />
                  {session.user.image && (
                    <span className='user-profile'>
                      <img src={session.user.image} alt={session.user.name} />
                    </span>
                  )}
                </div>
                <Link href='/Account/Portfolio'>
                  <a>
                    <button className='button-primary mt-3 homepage-button'>
                      Portfolio
                    </button>
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
