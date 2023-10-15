'use client'
import TopNav from '../../components/TopNav'
import Sidebar from '../../components/Sidebar'
import { useState } from 'react'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarVisible, setSideBarVisible] = useState(false)

  const toggleSidebar = () => {
    setSideBarVisible(!isSidebarVisible)
  }
  return (
    <div className='flex flex-col'>
      <Sidebar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <TopNav toggleSidebar={toggleSidebar} />
      <div>{children}</div>
    </div>
  )
}
