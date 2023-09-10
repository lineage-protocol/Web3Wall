import { useEffect, useState } from 'react'
// import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
// import { connectorsForWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { PhantomConnector } from 'phantom-wagmi-connector'
import { bsc, bscTestnet, goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import MainLayout from 'layouts/MainLayout'
import './App.css'
// Hook
import { IpfsProvider } from 'hooks/use-ipfs'
import { AlertMessageProvider } from 'hooks/use-alert-message'
// import { rainbowWeb3AuthConnector } from 'hooks/rainbow-web3auth-connector';
// Router
import { Route, Routes } from 'react-router-dom'

import PageIndex from 'pages'
import PageInventory from 'pages/inventory'
import { ApiProvider } from 'hooks/use-api'
import PublicLayout from 'layouts/PublicLayout'
import { Web3AuthProvider } from 'hooks/use-web3auth'
import PageLogin from 'pages/Login'
import PageDashboard from 'pages/Dashboard'
import PageWall from 'pages/Wall'
import PageNewPost from 'pages/NewPost'

const App = () => {
  return (
    <IpfsProvider>
      <Web3AuthProvider>
        <ApiProvider>
          <Routes>
            <Route element={<MainLayout children={undefined} />}>
              <Route path="/inventory" element={<PageInventory />} />
              <Route path="/dashboard" element={<PageDashboard />} />
              <Route path="/wall/:token_address/:token_id/:chain_id/:key/" element={<PageWall />} />
            </Route>
            <Route element={<PublicLayout children={undefined} />}>
              <Route path="/" element={<PageIndex />} />
              <Route path="/login" element={<PageLogin />} />
              <Route path="/new/:id" element={<PageNewPost />} />
            </Route>
          </Routes>
        </ApiProvider>
      </Web3AuthProvider>
    </IpfsProvider>
  )
}

const currentChain = [
  // mainnet
  mainnet,
  polygon,
  bsc,
  // tesnet
  goerli,
  polygonMumbai,
  bscTestnet,
]

// Web3 Configs
const { chains, publicClient } = configureChains(currentChain, [
  infuraProvider({ apiKey: String(import.meta.env.VITE_INFURA_ID) }),
  jsonRpcProvider({
    rpc: chain => {
      return {
        http: `${chain.rpcUrls.default}`,
      }
    },
  }),
  publicProvider(),
])

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [new MetaMaskConnector({ chains }), new PhantomConnector({ chains })],
  publicClient,
})

export function Web3Wrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <WagmiConfig config={wagmiConfig}>
      <IpfsProvider>
        <AlertMessageProvider>{children}</AlertMessageProvider>
      </IpfsProvider>
    </WagmiConfig>
  )
}

export default App
