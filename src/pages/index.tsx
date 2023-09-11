import AddToHomeScreenModal from 'components/Modal/AddToHomeScreenModal'
import AndroidNotMatchModal from 'components/Modal/AndroidNotMatch'
import IosNotMatchModal from 'components/Modal/IosNotMatch'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

declare global {
  interface Navigator {
    standalone?: boolean
  }
}

const PageIndex = () => {
  const [isPWA, setIsPWA] = useState(false)
  const [isPWAAndroid, setIsPWAAndroid] = useState(false)
  const [isPWAiOS, setIsPWAIOS] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const getAndroidVersion = (userAgent: string): number => {
      return parseFloat(userAgent.slice(userAgent.indexOf('Android') + 8))
    }

    const getIOSVersion = (userAgent: string): number => {
      const match = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/)
      return match ? parseFloat(match[1]) : 0
    }

    const checkVersion = () => {
      const userAgent = navigator.userAgent
      const isAndroid = userAgent.match(/Android/i)
      const isIOS = userAgent.match(/iPhone|iPad|iPod/i)
      const minimumAndroidVersion = 6.0
      const minimumIOSVersion = 11.0

      if (isAndroid && getAndroidVersion(userAgent) > minimumAndroidVersion) {
        setIsPWAAndroid(true)
      }

      if (isIOS && getIOSVersion(userAgent) > minimumIOSVersion) {
        setIsPWAIOS(true)
      }
    }

    const checkPWA = () => {
      setIsPWA(
        window.matchMedia('(display-mode: standalone)').matches ||
          window.navigator.standalone ||
          document.referrer.includes('android-app://')
      )
    }

    checkPWA()
  }, [])

  useEffect(() => {
    if (isPWA && (isPWAiOS || isPWAAndroid)) {
      navigate('/login')
    }
  }, [isPWA, isPWAiOS, isPWAAndroid, navigate])

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center p-2 w-full mx-auto">
        {!isPWA && <AddToHomeScreenModal />}
      </div>
    </>
  )
}

export default PageIndex
