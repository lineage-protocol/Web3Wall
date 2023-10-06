import GenericButton from 'components/Buttons/GenericButton'
import { HomeIcon, LoginIcon, LogoutIcon } from 'components/Icons/icons'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useNavigate } from 'react-router-dom'
import { useBoundStore } from 'store'

const PageLogin = () => {
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

  return (
    <>
      <div className="h-screen bg-white">
        <div className="h-full p-2">
          <div className="border-gray-800 h-full">
            <div className="flex-auto flex flex-col h-2/3 items-center justify-center relative">
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
                    <GenericButton
                      className="w-full"
                      icon={<LoginIcon />}
                      name="Login"
                      onClick={() => onClickLogin()}
                    />
                  )}
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
      </div>
    </>
  )
}

export default PageLogin
