import GenericButton from 'components/Buttons/GenericButton'
import { HomeIcon, LoginIcon, LogoutIcon } from 'components/Icons/icons'
import AddToHomeScreenModal from 'components/Modal/AddToHomeScreenModal'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBoundStore } from 'store'

const PageLogin = () => {
  const [openInstall, setOpenInstall] = useState(false)

  const [isPWA, setIsPWA] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  const navigate = useNavigate()
  const { userInfo, connect } = useWeb3Auth()

  const { wall, setWallState } = useBoundStore()

  const onClickLogin = async () => {
    await connect()
    wall?.shareURL ? navigate(wall.shareURL) : navigate('/')
    setWallState({ shareURL: undefined })
  }

  const onClickDashboard = () => {
    wall?.shareURL ? navigate(wall.shareURL) : navigate('/')
    setWallState({ shareURL: undefined })
  }

  const onPWAInstallPrompt = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
        setDeferredPrompt(null)
      })
    } else {
      setOpenInstall(true)
    }
  }

  const onCloseOpenInstall = () => {
    setOpenInstall(false)
  }

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const evt = e as any
      setDeferredPrompt(evt)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Check if PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsPWA(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  return (
    <>
      <AddToHomeScreenModal show={openInstall} onClose={onCloseOpenInstall} />
      <div className="h-screen bg-white p-2">
        <div className="border-gray-800 h-full">
          <div className="flex-auto flex flex-col h-2/4 items-center justify-center relative">
            <div className="text-center">
              <div className="text-3xl font-medium text-transparent bg-clip-text bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-600 via-indigo-300 to-indigo-900">
                w3wall
              </div>
              <div className="text-6xl pt-10 text-gray-900">wall it up!</div>
            </div>
          </div>
          <div className="flex-none h-1/3 flex items-center justify-center">
            <div className="mx-auto">
              <div className="w-full text-center flex-col space-y-2">
                <GenericButton
                  className="w-full"
                  name="Dashboard"
                  icon={<HomeIcon />}
                  onClick={() => onClickDashboard()}
                />
                {!userInfo && (
                  <GenericButton className="w-full" icon={<LoginIcon />} name="Login" onClick={() => onClickLogin()} />
                )}
                <div>
                  {!isPWA && (
                    <button
                      className="w-full mt-5 group relative inline-block text-sm font-medium text-purple-800 focus:outline-none focus:ring active:text-gray-500 cursor-pointer"
                      onClick={onPWAInstallPrompt}
                    >
                      <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-purple-400 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
                      <span className="flex items-center relative border border-purple-900 bg-purple-200 px-8 py-3">
                        <LoginIcon />
                        Install App
                      </span>
                    </button>
                  )}
                </div>
                <div className="w-full mx-auto text-center text-sm mt-4 text-gray-500">
                  <div className="mt-5 text-xs">
                    Powered by
                    <a href="https://lineageprotocol.com" target="_blank" className="ml-1 text-indigo-600">
                      Lineage
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageLogin
