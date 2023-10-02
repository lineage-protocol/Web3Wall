import { createContext, useContext, useEffect, useState } from 'react'
import OneSignal from 'react-onesignal'
import oneSignalService, { SendNotificationArgs } from '../services/onesignal'

interface OneSignalContextInterface {
  sendNotification: (data: SendNotificationArgs) => Promise<void>
}

export const OneSignalContext = createContext<OneSignalContextInterface | undefined>(undefined)

export const useOneSignal = () => {
  const context = useContext(OneSignalContext)
  if (!context) {
    throw new Error('useOneSignal must be used within a OneSignalProvider')
  }
  return context
}

interface OneSignalProviderProps {
  children: React.ReactNode
}

export const OneSignalProvider: React.FC<OneSignalProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false)

  const sendNotification = async (data: SendNotificationArgs) => {
    await oneSignalService.sendNotification(data)
  }

  useEffect(() => {
    async function init() {
      if (isInitialized) return
      await OneSignal.init({ appId: import.meta.env.VITE_ONESIGNAL_APP_ID })
      setIsInitialized(true)
    }

    init()
  }, [])

  return (
    <OneSignalContext.Provider value={{ sendNotification }}>
      <div>{children}</div>
    </OneSignalContext.Provider>
  )
}
