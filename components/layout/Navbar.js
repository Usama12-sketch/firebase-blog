"use client"
import React from 'react'
import { signOut } from '@lib/firebase';
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@contexts/auth';

export default function Nav(props) {

  const [user] = useAuth();                                 
  const [nav, setNav] = useState(
    "navbar")
  const [icon, setIcon] = useState("MENU"
  )

  function navbarflex() {
    if (nav == (" ml-80 opacity-100 ")) {

      let tailplus = "ml-0 left-60 duration-500 "
      setNav(
        tailplus)
      setIcon("CLOSE")
    }
    else {

      setNav(
        " ml-80 opacity-100 "
      )
      setIcon("MENU")
    }
  }

  return (
    <>
    
          <div className=" w-full md:h-16 h-10 px-2 flex fixed flex-row  hover:bg-gray-600 duration-500 bg-gray-300 items-center  justify-between  hover:cursor-pointer  z-50 lg:relative  bg-opacity-50 lg:h-auto hover:text-white h-16 ">
    <Link className=' font-serif  text-xl' href="/">{props.link1}</Link>
    
            
            <div className={`${nav} fixed md:relative lg:relative lg:w-38 md:w-38  opacity- duration-500 flex  md:flex-row flex-col left-80 lg:mx-0 mt-40 md:mt-0  justify-between gap-2`}>

  <span className='flex lg:flex-row  flex-col justify-center text-center lg:mx-0  text-yellow-300 hover:text-white px-2
         rounded-3xl border-2  bg-gradient-to-tr
         hover:bg-gradient-to-bl
          from-yellow-500 to-blue-500 lg:opacity-100 
           transition-all delay-200
           duration-700 ease-in-out
          text-sm md:text-xl 
             lg:text-xl'>
    <Link onClick={navbarflex} href="/">home
    </Link>
  </span>
  <span className='flex lg:flex-row  flex-col justify-center text-center lg:mx-0  text-yellow-300 hover:text-white px-2
         rounded-3xl border-2  bg-gradient-to-tr
         hover:bg-gradient-to-bl
          from-yellow-500 to-blue-500 lg:opacity-100 
           transition-all delay-200
           duration-700 ease-in-out
          text-sm md:text-xl 
             lg:text-xl'>
    <Link onClick={navbarflex} href="/blog">Blog
    </Link>
  </span>
  <span className='flex lg:flex-row  flex-col justify-center text-center lg:mx-0  text-yellow-300 hover:text-white px-2
         rounded-3xl border-2  bg-gradient-to-tr
         hover:bg-gradient-to-bl
          from-yellow-500 to-blue-500 lg:opacity-100 
           transition-all delay-200
           duration-700 ease-in-out
          text-sm md:text-xl 
             lg:text-xl'>
    <Link onClick={navbarflex} href="/usama">Usama
    </Link>
  </span>

  {user && (
    <span className='flex lg:flex-row  flex-col justify-center text-center
    lg:mx-0   text-yellow-300 hover:text-white
    rounded-3xl border-2  bg-gradient-to-tr
     hover:bg-gradient-to-bl
     from-yellow-500 to-blue-500 lg:opacity-100 
      px-3
      transition-all delay-200
      duration-700 ease-in-out
     text-sm md:text-xl 
     lg:text-xl'>
      <button onClick={() => signOut()}>
        <Link onClick={navbarflex} href="/">
        Sign Out
        </Link>
        </button>

    </span>
  )}

  {!user && (
    <span className='flex lg:flex-row  flex-col justify-center text-center
    lg:mx-0    text-yellow-300 hover:text-white
    rounded-3xl border-2  bg-gradient-to-tr
     hover:bg-gradient-to-bl
     from-yellow-500 to-blue-500 lg:opacity-100 
      px-3
      transition-all delay-200
      duration-700 ease-in-out
     text-sm md:text-xl 
       lg:text-xl'>
      <Link onClick={navbarflex} href="/signin">Sign in</Link>

    </span>
  )}

  {user && (
    <span className='flex lg:flex-row  flex-col justify-center items-center text-center
    lg:mx-0   text-yellow-300 hover:text-white
    rounded-3xl border-2  bg-gradient-to-tr
     hover:bg-gradient-to-bl
     from-yellow-500 to-blue-500 lg:opacity-100
     px-3
      transition-all delay-200
      duration-700 ease-in-out
     text-sm md:text-xl 
     lg:text-xl'>
      <Link onClick={navbarflex} href="/create">Create post</Link>

    </span>
  )}
  

         



      </div>

      
<a className="right-0 text-yellow-400 bg-blue-500 rounded-xl
 lg:invisible md:invisible 
text-center sm:text-2xl lg:text-3xl" onClick={navbarflex}>{icon}</a>
  </div>

    </>
  )
}
