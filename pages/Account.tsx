import { useSession, signIn, signOut, getSession } from "next-auth/client";
import React, { useEffect } from "react";

export default function SignUp() {
  const [session, loadingSession] = useSession();

  const signInHandler = (provider) => {
    signIn(provider);
  };

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
              <h1 className='text-center'> Sign in with Google or Github</h1>
              <button
                className='sign-in-button'
                onClick={() => signInHandler("google")}
              >
                Sign In Google
              </button>
              <button
                className='sign-in-button'
                onClick={() => {
                  signInHandler("github");
                }}
              >
                Sign In GitHub
              </button>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
