import { useSession, signIn, signOut, getSession } from "next-auth/client";
import React from "react";

export default function SignUp() {
  const [session, loadingSession] = useSession();

  if (loadingSession) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>Google Authentication with NextAuth </h1>

      {!session && (
        <>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}

      {session && (
        <>
          <h4>You are logged as: {session.user.name}</h4>
          <div>
            <h4>Email: {session.user.email}</h4>
            <br />
            {session.user.image && (
              <span>
                <img src={session.user.image} alt={session.user.name} />
              </span>
            )}
          </div>

          <br />
          <br />
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      )}
    </div>
  );
}
