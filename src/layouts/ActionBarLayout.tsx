import { Outlet, useLocation } from 'react-router-dom'
import { Web3Wrapper } from 'App'
import HeaderActionBar from 'components/Header/ActionBar'
import { useNavigationContext } from 'hooks/use-navigation'
import { useEffect } from 'react'

const ActionBarLayout = () => {
  const { pushToStack, historyStack } = useNavigationContext()

  const location = useLocation()

  useEffect(() => {
    if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== location.pathname) {
      pushToStack(location.pathname)
    }
  }, [historyStack, location.pathname, pushToStack])

  return (
    <>
      <Web3Wrapper>
        <div className="container md:max-w-md mx-auto text-black bg-gray-200 h-screen pb-[100px]">
          <HeaderActionBar />
          <div className="pt-[55px]">
            <Outlet />
          </div>
        </div>
      </Web3Wrapper>
    </>
  )
}

export default ActionBarLayout
