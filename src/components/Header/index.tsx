import { useWeb3Auth } from 'hooks/use-web3auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBoundStore } from 'store'

export default function Header() {
  const { getAccounts, disconnect } = useWeb3Auth()
  const navigate = useNavigate()
  const { setWallState } = useBoundStore()

  const [address, setAddress] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const setShareURL = () => {
    let url = new URL(window.location.href)
    let isShare = url.searchParams.get('share')
    console.log(url.pathname)
    if (isShare) setWallState({ shareURL: url.pathname.split('?')[0] })
  }

  useEffect(() => {
    const getAccount = async () => {
      const acc = await getAccounts()
      if (!acc) {
        navigate('/login')
      }
      setAddress(acc)
      setIsLoaded(true)
    }

    setShareURL()
    getAccount()
  }, [getAccounts, navigate])

  const onLogOut = async () => {
    await disconnect()
    navigate('/login')
  }

  return (
    <>
      <header className="bg-gray-50 fixed w-full top-0 z-10">
        <div className="mx-auto max-w-screen-xl px-4 py-2">
          <div className="">
            <div className="flex justify-between items-center">
              <Link to="/dashboard" className="block shrink-0">
                <span className="sr-only">Logo</span>
                <img alt="Man" src="/logo-w3wall.png" className="h-10 w-10" />
              </Link>

              <div className="text-right">
                <Link to="/login" className="block shrink-0">
                  {isLoaded && address && address.substring(0, 6) + '...' + address.substring(address.length - 4)}
                </Link>
                <button
                  onClick={() => onLogOut()}
                  className="block shrink-0 text-right w-full font-semibold text-red-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
