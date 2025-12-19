'use client'

import Link from 'next/link'
import {useSession, signOut} from 'next-auth/react'
import {User} from 'next-auth'
import {Button} from './ui/button.tsx'

const Navbar = () => {
  const {data: session} = useSession()
  const user: User = session?.user as User

  return (
    <nav className=" m-8 p-3 md:p-4 shadow-md bg-neutral-900 text-black rounded-xl border border-gray-300">
      <div className="container p-2 mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href='#' className="text-xl text-white font-bold mb-4 md:mb-0">Anonymous Texts</a>
        {session ? (
          <>
            <span className="mr-4 text-white">Welcome, {user?.username || user?.email}</span>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>Logout</Button>
          </>
        ) : (
          <Link href='/sign-in'>
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
