import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

export default function SignUp() {
  const { data: session, status } = useSession();
  if (session) {
    console.log(session);
    console.log(status);
    console.log(JSON.stringify(session.user));
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}