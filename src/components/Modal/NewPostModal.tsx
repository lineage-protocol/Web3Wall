import { Dialog, Transition } from '@headlessui/react'
import GenericButton from 'components/Buttons/GenericButton'
import { CameraIcon, CloseIcon, LoadingSpinner } from 'components/Icons/icons'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { Fragment, useEffect, useRef, useState } from 'react'
import { usePublishTransaction, useStoreBlob } from 'repositories/rpc.repository'
import imageCompression from 'browser-image-compression'
import { v4 } from 'uuid'
import { useAlertMessage } from 'hooks/use-alert-message'
import DOMPurify from 'dompurify'

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
  const [file, setFile] = useState<File | Blob>()
  const [textRows, setTextRows] = useState(8)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const { mutateAsync: storeBlob } = useStoreBlob()
  const { mutateAsync: publishTx } = usePublishTransaction()

  const { signMessage, getAccounts } = useWeb3Auth()
  const { showError, showSuccess } = useAlertMessage()

  const onPost = async (): Promise<void> => {
    const account = await getAccounts()
    if (!account) {
      return
    }
    setIsLoading(true)
    let url = ''
    if (!file) {
      showError(`Internal error. Try again`)
      setIsLoading(false)
      return
    }

    url = await storeBlob(new Blob([file]))

    const content = {
      text: DOMPurify.sanitize(text.replace(/'/g, '’')),
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
        public_key: account as string,
        token_address: prop.tokenAddress as string,
        token_id: prop.tokenId as string,
        version: v4(),
      })

      showSuccess(`Publishing your post to network...`)
      onCloseDialog()
    } catch (e) {
      showError(`Error submitting your post. Try again.`)
      onCloseDialog()
    }
  }

  const onCloseDialog = () => {
    setText('')
    setFile(undefined)

    prop.onClose()
    setIsLoading(false)
  }

  const onSelectMedia = (e: React.FormEvent<HTMLInputElement>) => {
    const filePicker = e.target as HTMLInputElement & {
      files: FileList
    }

    if (!filePicker || !filePicker.files || filePicker.files.length <= 0) {
      showError('No file selected')
      return
    }

    const pickedFile = filePicker.files[0]

    if (pickedFile.type.includes('image')) {
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 400,
      }

      imageCompression(pickedFile, options)
        .then(compressedFile => {
          setFile(compressedFile)
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      setFile(pickedFile)
    }
  }

  const getFileType = (): 'image' | 'video' | undefined => {
    if (!file) return undefined
    if (file.type.includes('image')) return 'image'
    if (file.type.includes('video')) return 'video'
  }

  const closeDialog = () => {
    prop.onClose()
  }

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

          <div className="max-w-md mx-auto fixed inset-0 overflow-y-auto">
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
                  <header className="bg-gray-50 w-full">
                    <div className="px-4 py-2">
                      <div className="">
                        <div className="flex justify-between">
                          <div className="relative flex items-center">
                            <button onClick={() => onCloseDialog()} className="p-2.5 text-gray-600">
                              Cancel
                            </button>
                          </div>
                          {isLoading ? (
                            <p className="block shrink-0 p-2.5">Processing...</p>
                          ) : (
                            <button
                              disabled={text.length <= 0}
                              onClick={() => onPost()}
                              className={`block shrink-0 p-2.5 font-semibold ${
                                text.length <= 0 ? 'text-gray-400' : 'text-blue-600'
                              }`}
                            >
                              Post
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="w-full flex flex-col">
                    <label className="sr-only" htmlFor="message">
                      Message
                    </label>

                    <div className="m-1">
                      <textarea
                        className="mt-5 w-full border-none text-sm bg-gray-100 radius-sm"
                        placeholder="What's happening?"
                        id="message"
                        rows={textRows}
                        value={text}
                        onChange={e => {
                          setText(e.target.value)
                        }}
                      />
                    </div>

                    <input
                      id="media"
                      name="media"
                      ref={inputFileRef}
                      type="file"
                      accept="image/x-png, image/jpeg, image/gif, video/mp4, video/x-m4v, video/*"
                      onChange={onSelectMedia}
                      className="bg-gray-400 p-3 hidden"
                    />

                    {file && (
                      <div className="flex justify-left w-full">
                        {getFileType() === 'image' && (
                          <img src={URL.createObjectURL(file)} className="object-scale-down max-h-52 p-1 w-full" />
                        )}
                        {getFileType() === 'video' && (
                          <video controls className="object-fit bg-indigo-600">
                            <source src={URL.createObjectURL(file)} type={file.type} />
                          </video>
                        )}
                      </div>
                    )}

                    <div className="flex gap-5 p-3">
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
