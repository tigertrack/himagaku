import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeart, faPenRuler, faUser, faRightToBracket, faAddressCard,faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import levels from '../constants/level';


type Props = {
    isSidebarVisible: boolean,
    toggleSidebar: () => void
};  

const Sidebar = ({isSidebarVisible, toggleSidebar} : Props) => {
  const sidebarRef = useRef(null)

  useEffect(() => {
    const hideSidebar = (event: any) => {
        if(sidebarRef.current != event.target && isSidebarVisible) toggleSidebar()
    }
    document.addEventListener("click", hideSidebar, false)
    
    return () => {
        document.removeEventListener("click", hideSidebar, false)
    }
  })
  return (
    <aside>
      <div className={`w-3/4 h-screen bg-zinc-700 absolute transition-all ease-out duration-150 ${isSidebarVisible ? "translate-x-0" :"-translate-x-full" }`}>
        <div className="flex p-4 items-center bg-sky-700">
          <FontAwesomeIcon size='3x' className="mr-4" icon={faUserCircle} />
          <div className="flex flex-col">
            <p className='text-xs'>Already have an account?</p>
            <p className='text-xs'>Proceed to <Link href="/login">Login</Link> or <Link href="/register">register</Link> a new account</p>
          </div>
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
          
          {levels.slice(1).map((level: number, index: number) => 
            <Link key={index} href={`/level/${index+1}`} className="px-4 py-3 hover:bg-zinc-600">
              <FontAwesomeIcon className="mr-4" icon={faPenRuler} />
              N{index+1} - {level}
            </Link>
          )}
          
          <Link href="/profiles" className="px-4 py-3 hover:bg-zinc-600">
            <FontAwesomeIcon className="mr-4" icon={faUser} />
            Profiles
          </Link>
          <div className="px-4 py-3 hover:bg-zinc-600">
            <FontAwesomeIcon className="mr-4" icon={faLock} />
            logout
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar