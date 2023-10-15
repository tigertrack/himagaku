import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js';
type Props = {
    toggleSidebar: React.MouseEventHandler<SVGSVGElement>
};  

const TopNav = ({toggleSidebar}: Props) => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState(true)
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<User | null>(null)
 
  useEffect(() => {
    const fetchUser = async () => {
      setisLoading(true)
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session?.user) setUser(session.user);
      setisLoading(false)
    };

    fetchUser();
  },[supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const MenuSkeleton = () => (
    <div className="sm:flex gap-5 hidden">
    <div onClick={handleSignOut} className="bg-sky-600 hover:cursor-pointer px-3 py-1 rounded-xl animate-pulse h-8 w-20"></div>
    <div onClick={handleSignOut} className="bg-sky-600 hover:cursor-pointer px-3 py-1 rounded-xl animate-pulse h-8 w-20"></div>
    <div onClick={handleSignOut} className="bg-sky-600 hover:cursor-pointer px-3 py-1 rounded-xl animate-pulse h-8 w-20"></div>
  </div>
  )
  
  return (
    <nav className='flex justify-between items-cente bg-sky-700 p-4'>
      <div className="flex items-center gap-2 w-full sm:w-fit">
        <div className='sm:hidden gap-1'><FontAwesomeIcon icon={faBars} onClick={toggleSidebar} /></div>
        
        <div className='text-center grow sm:grow-0'>
          <span onClick={() => router.push("/")} className='hover:cursor-pointer' >Himagaku</span>
        </div>
      </div>
      {isLoading ? <MenuSkeleton /> : <div className="sm:flex gap-1 hidden">
        <Link href="/search" className="hover:bg-sky-600 hover:cursor-pointer px-3 py-1 rounded">Search</Link>
        <Link href="/favorites" className="hover:bg-sky-600 hover:cursor-pointer px-3 py-1 rounded">Favorites</Link>
        <Link href="/level" className="hover:bg-sky-600 hover:cursor-pointer px-3 py-1 rounded">Quizes</Link>
        {!user && <Link href="/login" className="hover:bg-sky-600 hover:cursor-pointer px-3 py-1 rounded">Login</Link>}
        {!user && <Link href="/register" className="hover:bg-sky-600 hover:cursor-pointer px-3 py-1 rounded">Register</Link>}
        {user && <div onClick={handleSignOut} className="hover:bg-sky-600 hover:cursor-pointer px-3 py-1 rounded">Logout</div>}
      </div>}
      
    </nav>
  )
}

export default TopNav