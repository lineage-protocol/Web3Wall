import { useEffect, useState } from 'react'
import MainLayout from 'layouts/MainLayout'
import './App.css'
// Hook
import { IpfsProvider } from 'hooks/use-ipfs'
import { AlertMessageProvider } from 'hooks/use-alert-message'
// Router
import { Route, Routes } from 'react-router-dom'

import PageIndex from 'pages'
import { ApiProvider } from 'hooks/use-api'
import PublicLayout from 'layouts/PublicLayout'
import { Web3AuthProvider } from 'hooks/use-web3auth'
import PageLogin from 'pages/Login'
import PageDashboard from 'pages/Dashboard'
import PageWall from 'pages/Wall'

const App = () => {
  return (
    <IpfsProvider>
      <Web3AuthProvider>
        <ApiProvider>
          <Routes>
            <Route element={<MainLayout children={undefined} />}>
              <Route path="/dashboard" element={<PageDashboard />} />
              <Route path="/wall/:token_address/:token_id/:chain_id/:key/" element={<PageWall />} />
            </Route>
            <Route element={<PublicLayout children={undefined} />}>
              <Route path="/" element={<PageIndex />} />
              <Route path="/login" element={<PageLogin />} />
            </Route>
          </Routes>
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
