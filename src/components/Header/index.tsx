import { useWeb3Auth } from 'hooks/use-web3auth'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  // const { getUserInfo, getAccounts } = useWeb3Auth()
  // useEffect(() => {
  //   const test = async () => {
  //     const a = await getAccounts()
  //     console.log(a)
  //   }

  //   test()
  // }, [])

  return (
    <>
      <header className="bg-gray-50 fixed w-full top-0 z-5">
        <div className="mx-auto max-w-screen-xl px-4 py-2">
          <div className="">
            <div className="flex justify-between">
              <Link to="/dashboard" className="block shrink-0">
                <span className="sr-only">Logo</span>
                <img alt="Man" src="/logo-w3wall.png" className="h-10 w-10" />
              </Link>

              <a
                href="#"
                className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
              >
                <span className="sr-only">Notifications</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
