import { useAlertMessage } from 'hooks/use-alert-message'
import { useWeb3Auth } from 'hooks/use-web3auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isEmptyObject } from 'utils'

export default function Header() {
  const { provider, getAccounts, disconnect } = useWeb3Auth()
  const navigate = useNavigate()

  const [address, setAddress] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const { showError } = useAlertMessage()

  useEffect(() => {
    const getAccount = async () => {
      try {
        const acc = await getAccounts()
        if (acc && acc.length > 0) {
          setAddress(acc.startsWith('0x') ? (acc as string) : '')
        }
      } catch (e) {
        e
      }

      setIsLoaded(true)
    }

    if (!isLoaded && provider && !isEmptyObject(provider as object)) {
      getAccount().catch(e => {
        console.log(e)
      })
    }
  }, [getAccounts, provider, showError])

  const onLogOut = async () => {
    setAddress('')
    await disconnect()
    navigate('/login')
  }

  return (
    <>
      <header className="bg-gray-50 fixed w-full max-w-md top-0 z-10 toolbar flex items-center">
        <div className="px-4 w-full">
          <div className="">
            <div className="flex justify-between items-center">
              <Link to="/" className="block shrink-0">
                <span className="sr-only">Logo</span>
                <img alt="Man" src="/logo-w3wall.png" className="h-10 w-10" />
              </Link>

              <div className="text-right">
                <Link to="/login" className="block shrink-0">
                  {isLoaded && address && address.substring(0, 6) + '...' + address.substring(address.length - 4)}
                </Link>
                {isLoaded && address ? (
                  <button
                    onClick={() => onLogOut()}
                    className="block shrink-0 text-right w-full font-semibold text-red-800"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="block shrink-0 text-right w-full font-semibold text-red-800"
                  >
                    Login
                  </button>
                )}{' '}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
