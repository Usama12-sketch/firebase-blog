import { signOut } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import Link from 'next/link';

const Layout = ({ children }) => {
  const [user] = useAuth();

  return (
    <div>
      <nav className=' bg-green-300 flex justify-evenly'>
        <span>
          <Link href="/">My Next.js Blog</Link>
        </span>
        {user && (
          <span>
            <button onClick={() => signOut()}>Sign Out</button>

          </span>
        )}
        {!user && (
          <span>
            <Link href="/signin">Sign in</Link>

          </span>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
