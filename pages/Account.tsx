import { useSession, signIn, signOut, getSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import googleImg from "../public/brands/google/google-logo.png";
import githubImg from "../public/brands/GitHub-Mark-64px.png";
import Image from "next/image";
import { getCustomRoute } from "next/dist/server/server-route-utils";
import UserObject from "../components/UserObject";

export default function SignUp() {
  const [session, loadingSession] = useSession();
  console.log(session);

  const [userState, setUserState] = useState([]);

  const signInHandler = (provider) => {
    signIn(provider);
  };

  const getData = async () => {
    const data = await fetch(
      `http://localhost:3000/api/user?email=${session?.user?.email}`
    );

    const response = await data.json();
    setUserState(response?.response?.value);
  };

  useEffect(() => {
    if (session !== null && session?.user?.email !== undefined) {
      getData();
    }
  }, [session]);

  if (loadingSession) {
    return <p>Loading...</p>;
  }
  return (
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
                <UserObject userData={userState} />
                {session.user.image && (
                  <span className='user-profile'>
                    <img src={session.user.image} alt={session.user.name} />
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
function checkUserEmail(email: any) {
  throw new Error("Function not implemented.");
}
