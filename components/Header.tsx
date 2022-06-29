import React from "react";
import Link from "next/link";
import SvgLogo from "./svgs/logo";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

const Header = () => {
  const [session, loadingSession] = useSession();

  return (
    <section id='header' className='d-flex flex-row align-items-center'>
      <div id='logo-container' className='d-flex flex-row align-items-center'>
        <Link href='/'>
          <a>
            <SvgLogo className='header-logo p-1' />
          </a>
        </Link>
        <Link href='/'>
          <a className='return'>
            <h1>Crypto Tradify</h1>
          </a>
        </Link>
      </div>

      <div className='user-status-container'>
        {session ? (
          <div className=''>
            <span>{session.user.name}</span>{" "}
            <button
              className='button-secondary account-button'
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            {session.user.image && (
              <span className='user-profile'>
                <img src={session.user.image} alt={session.user.name} />
              </span>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Header;
