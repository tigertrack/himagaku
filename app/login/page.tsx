import React from 'react'

const page = () => {
  return (
    <main className='p-4 flex flex-col sm:items-center'>
      <h1 className='text-4xl mb-2'>Let&apos;s sign you in</h1>
      <h3 className='text-2xl font-light text-gray-500 leading-loose'>Welcome back, you&apos;ve been missed!</h3>
      <form>
      <input
        className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-sky-400 focus:ring-1"
        id="inputField"
        type="text"
        placeholder="Enter your text here"
      />
      </form>  
    </main>
  )
}

export default page