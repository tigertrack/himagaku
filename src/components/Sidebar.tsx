import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faHeart,
  faPenRuler,
  faUser,
  faLock,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import levels from '../constants/level';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import moment from 'moment';
type Props = {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isSidebarVisible, toggleSidebar }: Props) => {
  const sidebarRef = useRef(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const hideSidebar = (event: any) => {
      if (sidebarRef.current != event.target && isSidebarVisible)
        toggleSidebar();
    };

    document.addEventListener('click', hideSidebar, false);

    return () => {
      document.removeEventListener('click', hideSidebar, false);
    };
  });

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session?.user) setUser(session.user);
    };

    fetchUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };
  return (
    <aside>
      <div
        className={`sm:hidden w-3/4 h-screen bg-zinc-700 absolute transition-all ease-out duration-150 ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex p-4 items-center bg-sky-700">
          <FontAwesomeIcon size="3x" className="mr-4" icon={faUserCircle} />
          {!user && (
            <div className="flex flex-col">
              <p className="text-xs">Already have an account?</p>
              <p className="text-xs">
                Proceed to <Link href="/login">Login</Link> or{' '}
                <Link href="/register">register</Link> a new account
              </p>
            </div>
          )}
          {user && (
            <div className="flex flex-col">
              <p className="text-xs">{user.email}</p>
              <p className="text-xs">
                Last login: {moment(user.last_sign_in_at).fromNow()}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <Link href="/search" className="px-4 py-3 hover:bg-zinc-600">
            <FontAwesomeIcon className="mr-4" icon={faSearch} />
            Search
          </Link>
          <Link href="/favorites" className="px-4 py-3 hover:bg-zinc-600">
            <FontAwesomeIcon className="mr-4" icon={faHeart} />
            Favorites
          </Link>

          {levels.map((level: any, index: number) => (
            <Link
              key={index}
              href={`/level/${index + 1}`}
              className="px-4 py-3 hover:bg-zinc-600"
            >
              <FontAwesomeIcon className="mr-4" icon={faPenRuler} />N{index + 1}{' '}
              - {level.name}
            </Link>
          ))}

          <Link href="/profiles" className="px-4 py-3 hover:bg-zinc-600">
            <FontAwesomeIcon className="mr-4" icon={faUser} />
            Profiles
          </Link>
          {user && (
            <div
              className="px-4 py-3 hover:bg-zinc-600"
              onClick={handleSignOut}
            >
              <FontAwesomeIcon className="mr-4" icon={faLock} />
              logout
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
