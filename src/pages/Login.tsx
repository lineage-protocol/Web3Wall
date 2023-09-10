import GenericButton from 'components/Buttons/GenericButton'
import { LoginIcon, LogoutIcon } from 'components/Icons/icons'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useNavigate } from 'react-router-dom'

const PageLogin = () => {
  const navigate = useNavigate()
  const { userInfo, connect, disconnect } = useWeb3Auth()

  const onClickLogin = async () => {
    await connect()
    navigate('/dashboard')
  }

  const onClickLogout = async () => {
    await disconnect()
  }

  return (
    <>
      <div className="h-screen">
        <div className="h-full p-2">
          <div className="border-gray-800 h-full">
            <div className="flex-auto flex flex-col h-2/3 items-center justify-center relative">
              <div className="text-center">
                <div className="text-3xl font-medium text-transparent bg-clip-text bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-600 via-indigo-300 to-indigo-900">
                  w3wall
                </div>
                <div className="text-6xl pt-10 text-gray-900">wall it up!</div>
                <div className="mt-5">
                  Powered by
                  <a href="" target="_blank" className="text-indigo-600">
                    <span> Lineage</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-none h-1/3 flex items-center justify-center">
              <div className="mx-auto">
                {!userInfo ? (
                  <GenericButton className="" icon={<LoginIcon />} name="Login" onClick={() => onClickLogin()} />
                ) : (
                  <GenericButton className="" icon={<LogoutIcon />} name="Logout" onClick={() => onClickLogout()} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageLogin
