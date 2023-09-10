import GenericButton from 'components/Buttons/GenericButton'
import { CameraIcon, LoadingSpinner } from 'components/Icons/icons'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePublishTransaction, useStoreBlob } from 'repositories/rpc.repository'

const LoadingOverlay = () => {
  return (
    <div className="fixed w-[100vw] top-0 left-0 flex flex-col items-center bg-opacity-30 bg-gray-400 bg-center bg-no-repeat bg-cover z-[99] justify-center h-[100vh]">
      <LoadingSpinner />
    </div>
  )
}

const PageNewPost = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [file, setFile] = useState<File>()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const { mutateAsync: storeBlob } = useStoreBlob()
  const { mutateAsync: publishTx } = usePublishTransaction()

  const { signMessage } = useWeb3Auth()

  const onPost = async (): Promise<void> => {
    setIsLoading(true)
    let url = ''
    if (file) url = await storeBlob(new Blob([file]))

    const content = {
      text,
      image: url,
    }

    const signed = await signMessage(JSON.stringify(content))

    await publishTx({
      alias: '',
      chain_id: state.chain_id,
      signature: signed?.signature as string,
      data: JSON.stringify(content),
      mcdata: JSON.stringify({ loose: 0 }),
      meta_contract_id: `${import.meta.env.VITE_WEB3WALL_META_CONTRACT_ID}`,
      method: 'metadata',
      public_key: signed?.torusAddress as string,
      token_address: state.token_address,
      token_id: state.token_id,
      version: '1',
    })

    setIsLoading(false)
    navigate(`/wall/${id}`)
  }

  const onGoBack = () => {
    window.history.back()
  }

  const onSelectMedia = () => {
    return new Promise<void>((resolve, reject) => {
      const filePicker = document.querySelector('input')

      if (!filePicker || !filePicker.files || filePicker.files.length <= 0) {
        reject('No file selected')
        return
      }

      const pickedFile = filePicker.files[0]
      setFile(pickedFile)
      resolve()
    })
  }

  const getFileType = (): 'image' | 'video' | undefined => {
    if (!file) return undefined
    if (file.type.includes('image')) return 'image'
    if (file.type.includes('video')) return 'video'
  }

  return (
    <div className="h-screen">
      <header className="bg-gray-50">
        <div className="px-4 py-2">
          <div className="">
            <div className="flex justify-between">
              <div className="relative flex items-center">
                <button onClick={() => onGoBack()} className="p-2.5 text-gray-600">
                  Cancel
                </button>
              </div>

              <button onClick={() => onPost()} className="block shrink-0 p-2.5 font-semibold text-blue-600">
                Post
              </button>
            </div>
          </div>
        </div>
      </header>

      {isLoading && <LoadingOverlay />}
      <div className="w-screen flex flex-col">
        <label className="sr-only" htmlFor="message">
          Message
        </label>

        <textarea
          className="m-5 border-none p-3 text-sm"
          placeholder="What's happening?"
          id="message"
          rows={8}
          value={text}
          onChange={e => {
            setText(e.target.value)
          }}
        />

        <div className="flex gap-5 justify-left p-3">
          <GenericButton
            onClick={() => {
              inputFileRef?.current?.click()
            }}
            name="Media"
            icon={<CameraIcon />}
            className=""
          />

          <input
            ref={inputFileRef}
            type="file"
            accept="image/x-png, image/jpeg, image/gif, video/mp4, video/x-m4v, video/*"
            onChange={() => onSelectMedia()}
            className="bg-gray-400 p-3 hidden"
          />
        </div>

        {file && (
          <div className="flex justify-left p-3 max-w-6xl max-h-[350px]">
            {getFileType() === 'image' && (
              <img src={URL.createObjectURL(file)} className="object-contain -bg-indigo-600 p-0.5" />
            )}
            {getFileType() === 'video' && (
              <video controls className="object-fit bg-indigo-600 p-0.5">
                <source src={URL.createObjectURL(file)} type={file.type} />
              </video>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PageNewPost
