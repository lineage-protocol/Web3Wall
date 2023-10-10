import { useEffect, useState } from 'react'
import MainLayout from 'layouts/MainLayout'
import './App.css'
// Hook
import { IpfsProvider } from 'hooks/use-ipfs'
import { AlertMessageProvider } from 'hooks/use-alert-message'
// Router
import { Route, Routes, useLocation } from 'react-router-dom'

import { ApiProvider } from 'hooks/use-api'
import PublicLayout from 'layouts/PublicLayout'
import { Web3AuthProvider } from 'hooks/use-web3auth'
import PageLogin from 'pages/Login'
import PageDashboard from 'pages/Dashboard'
import PageWall from 'pages/Wall'
import PageComment from 'pages/Comment'
import ActionBarLayout from 'layouts/ActionBarLayout'
import { NavigationProvider } from 'hooks/use-navigation'
import ReactGA from 'react-ga4'
import useGoogleAnalytic from 'hooks/useGoogleAnalytic'
ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID as string)

const App = () => {
  const location = useLocation()
  useGoogleAnalytic(location)

  return (
    <IpfsProvider>
      <Web3AuthProvider>
        <ApiProvider>
          <NavigationProvider>
            <AlertMessageProvider>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<PageDashboard />} />
                  <Route path="/wall/:token_address/:token_id/:chain_id/:key/" element={<PageWall />} />
                </Route>
                <Route element={<PublicLayout children={undefined} />}>
                  <Route path="/login" element={<PageLogin />} />
                </Route>
                <Route element={<ActionBarLayout />}>
                  <Route path="/comment/:token_address/:token_id/:chain_id/:cid/" element={<PageComment />} />
                </Route>
              </Routes>
            </AlertMessageProvider>
          </NavigationProvider>
        </ApiProvider>
      </Web3AuthProvider>
    </IpfsProvider>
  )
}

export function Web3Wrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <IpfsProvider>
      <AlertMessageProvider>{children}</AlertMessageProvider>
    </IpfsProvider>
  )
}

export default App
