import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { Web3Wrapper } from 'App'
import { useNavigationContext } from 'hooks/use-navigation'
import { useEffect } from 'react'
import { LoadingSpinner } from 'components/LoadingScreen'

const MainLayout = () => {
  const { pushToStack, popFromStack, historyStack } = useNavigationContext()
  const location = useLocation()

  useEffect(() => {
    if (historyStack.length > 0 && historyStack[historyStack.length - 1] !== location.pathname) {
      popFromStack()
      pushToStack(location.pathname)
    } else if (historyStack.length === 0) {
      pushToStack(location.pathname)
    }
  }, [historyStack, location.pathname, popFromStack, pushToStack])

  return (
    <Web3Wrapper>
      <LoadingSpinner />
      <div className="container md:max-w-md mx-auto text-black bg-gray-200 h-screen pb-[100px]">
        <Header />
        <div className="pt-[55px]">
          <Outlet />
        </div>
      </div>
    </Web3Wrapper>
  )
}

export default MainLayout
