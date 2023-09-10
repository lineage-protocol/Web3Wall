import { Dialog, Transition } from '@headlessui/react'
import GenericButton from 'components/Buttons/GenericButton'
import { CameraIcon, LoadingSpinner } from 'components/Icons/icons'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePublishTransaction, useStoreBlob } from 'repositories/rpc.repository'

const LoadingOverlay = () => {
  return (
    <div className="fixed w-[100vw] top-0 left-0 flex flex-col items-center bg-opacity-30 bg-gray-400 bg-center bg-no-repeat bg-cover z-[99] justify-center h-[100vh]">
      <LoadingSpinner />
    </div>
  )
}

interface Props {
  id: String
  chainId: String
  tokenAddress: String
  tokenId: String
  isOpen: boolean
  onClose: () => void
  afterLeave?: () => void
}

const NewPostModal = (prop: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [file, setFile] = useState<File>()
  const [disablePostBtn, setDisablePostBtn] = useState(true)
  const [textRows, setTextRows] = useState(8)
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

    try {
      const signed = await signMessage(JSON.stringify(content))

      await publishTx({
        alias: '',
        chain_id: prop.chainId as string,
        signature: signed?.signature as string,
        data: JSON.stringify(content),
        mcdata: JSON.stringify({ loose: 0 }),
        meta_contract_id: `${import.meta.env.VITE_WEB3WALL_META_CONTRACT_ID}`,
        method: 'metadata',
        public_key: signed?.torusAddress as string,
        token_address: prop.tokenAddress as string,
        token_id: prop.tokenId as string,
        version: '1',
      })

      onCloseDialog()
    } catch (e) {
      console.log(e)
      onCloseDialog()
    }
  }

  const onCloseDialog = () => {
    setText('')
    setFile(undefined)

    prop.onClose()

    setIsLoading(false)
  }

  const onSelectMedia = () => {
    return new Promise<void>((resolve, reject) => {
      const filePicker = document.getElementById('media') as HTMLInputElement

      if (!filePicker || !filePicker.files || filePicker.files.length <= 0) {
        reject('No file selected')
        return
      }

      const pickedFile = filePicker.files[0]
      setFile(pickedFile)
      setTextRows(2)
      resolve()
    })
  }

  const getFileType = (): 'image' | 'video' | undefined => {
    if (!file) return undefined
    if (file.type.includes('image')) return 'image'
    if (file.type.includes('video')) return 'video'
  }

  const closeDialog = () => {
    prop.onClose()
  }

  useEffect(() => {
    if (file || text) {
      setDisablePostBtn(false)
    } else {
      setDisablePostBtn(true)
    }
  }, [file, text])

  return (
    <>
      <Transition
        appear
        show={prop.isOpen}
        as={Fragment}
        afterLeave={() => {
          prop?.afterLeave ? prop.afterLeave() : () => {}
        }}
      >
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-screen text-center transform overflow-hidden bg-white align-middle shadow-xl transition-all">
                  <header className="bg-gray-50">
                    <div className="px-4 py-2">
                      <div className="">
                        <div className="flex justify-between">
                          <div className="relative flex items-center">
                            <button onClick={() => onCloseDialog()} className="p-2.5 text-gray-600">
                              Cancel
                            </button>
                          </div>

                          <button
                            disabled={disablePostBtn}
                            onClick={() => onPost()}
                            className="block shrink-0 p-2.5 font-semibold text-blue-600"
                          >
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
                      className="mt-5 border-none p-3 text-sm"
                      placeholder="What's happening?"
                      id="message"
                      rows={textRows}
                      value={text}
                      onChange={e => {
                        setText(e.target.value)
                      }}
                    />

                    <input
                      id="media"
                      name="media"
                      ref={inputFileRef}
                      type="file"
                      accept="image/x-png, image/jpeg, image/gif, video/mp4, video/x-m4v, video/*"
                      onChange={() => onSelectMedia()}
                      className="bg-gray-400 p-3 hidden"
                    />

                    {file && (
                      <div className="flex justify-left w-full">
                        {getFileType() === 'image' && (
                          <img src={URL.createObjectURL(file)} className="object-contain -bg-indigo-600" />
                        )}
                        {getFileType() === 'video' && (
                          <video controls className="object-fit bg-indigo-600">
                            <source src={URL.createObjectURL(file)} type={file.type} />
                          </video>
                        )}
                      </div>
                    )}

                    <div className="flex gap-5 justify-center p-3">
                      <GenericButton
                        onClick={() => {
                          inputFileRef?.current?.click()
                        }}
                        name="Media"
                        icon={<CameraIcon />}
                        className=""
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default NewPostModal
