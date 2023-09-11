import GenericButton from 'components/Buttons/GenericButton'
import { LoginIcon, LogoutIcon } from 'components/Icons/icons'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useNavigate } from 'react-router-dom'
import { useBoundStore } from 'store'

const PageLogin = () => {
  const navigate = useNavigate()
  const { userInfo, connect } = useWeb3Auth()

  const { wall } = useBoundStore()

  const onClickLogin = async () => {
    await connect()
    wall?.shareURL ? navigate(wall.shareURL) : navigate('/dashboard')
  }

  const onClickDashboard = () => {
    wall?.shareURL ? navigate(wall.shareURL) : navigate('/dashboard')
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
                <div className="mt-5">
                  Powered by
                  <a href="https://lineageprotocol.com" target="_blank" className="text-indigo-600">
                    <span> Lineage</span>
                  </a>
                </div>
                <div className="flex justify-center gap-5 mt-8">
                  <a href="https://twitter.com/LineageProtocol" target="_blank" className="text-indigo-600">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#212121"
                          fillRule="evenodd"
                          d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fill="#fff"
                          d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                        ></path>
                        <polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon>
                        <polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
                      </svg>
                    </span>
                  </a>
                  <a href="https://t.me/c/1868508220/3" target="_blank" className="text-indigo-600">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 50 50">
                        <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-none h-1/3 flex items-center justify-center">
              <div className="mx-auto">
                {!userInfo ? (
                  <div className="w-full text-center">
                    <GenericButton className="" icon={<LoginIcon />} name="Login" onClick={() => onClickLogin()} />
                    <div className="w-4/5 mx-auto text-center text-sm mt-4 text-gray-500">
                      <div className="">
                        Please make sure to disable your popup blocker in your Settings to ensure that the app functions
                        correctly.
                      </div>
                    </div>
                  </div>
                ) : (
                  <GenericButton className="" name="Go To Dashboard" onClick={() => onClickDashboard()} />
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
