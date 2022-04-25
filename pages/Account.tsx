import { useSession, signIn, signOut, getSession } from "next-auth/client";
import React from "react";

export default function SignUp() {
  const [session, loadingSession] = useSession();

  if (loadingSession) {
    return <p>Loading...</p>;
  }
  return (
    <section
      id='account-page'
      className='d-flex flex-row justify-content-center'
    >
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className='text-center'> Sign in with Google or Github</h1>

        <div>
          {!session && (
            <>
              <button className='sign-in-button' onClick={() => signIn()}>
                Sign In
              </button>
            </>
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
