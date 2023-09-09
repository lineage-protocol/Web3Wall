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
      <div className="flex flex-col h-screen">
        <div className="flex-auto flex items-center justify-center">{userInfo && <p>Hello, {userInfo?.email}</p>}</div>
        <div className="flex-none h-1/3 bg-gray-300 flex items-center justify-center">
          <div className="mx-auto">
            {!userInfo ? (
              <GenericButton className="" icon={<LoginIcon />} name="Login" onClick={() => onClickLogin()} />
            ) : (
              <GenericButton className="" icon={<LogoutIcon />} name="Logout" onClick={() => onClickLogout()} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PageLogin
