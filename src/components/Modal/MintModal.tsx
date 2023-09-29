import { Dialog, Transition } from '@headlessui/react'
import GenericButton from 'components/Buttons/GenericButton'
import MintButton from 'components/Buttons/MintButton'
import { CameraIcon, TelegramIcon } from 'components/Icons/icons'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useStoreBlob } from 'repositories/rpc.repository'
import imageCompression from 'browser-image-compression'
import { useWeb3Auth } from 'hooks/use-web3auth'

interface Props {
  isOpen: boolean
  onClose: () => void
  afterLeave?: () => void
}

const NoMaticModal = () => {
  const goToTelegram = () => {
    window.open('https://t.me/+H7Spt2NaASY0ZTE1', '_blank')
  }
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-yellow-500 bg-red-50 p-4 text-left absolute flex justify-between items-center"
    >
      <div className="">
        <strong className="block font-medium text-yellow-800">No $MATIC?</strong>
        <p className="text-sm text-yellow-700">Join our telegram group and request from there</p>
      </div>
      <div>
        <button className="bg-blue-500 rounded-full p-3" onClick={goToTelegram}>
          <TelegramIcon />
        </button>
      </div>
    </div>
  )
}

const MintModal = (prop: Props) => {
  const [file, setFile] = useState<File | Blob>()
  const [imagePreview, setImagePreview] = useState('')
  const inputFileRef = useRef<HTMLInputElement>(null)

  const [mint, setMint] = useState({ name: '', image: '', body: '' })
  const { data: url, mutateAsync: storeBlob } = useStoreBlob()
  const { getUserBalance } = useWeb3Auth()
  const [balance, setBalance] = useState<number>(0)

  const onSelectMedia = () => {
    return new Promise<void>((resolve, reject) => {
      const filePicker = document.getElementById('image') as HTMLInputElement

      if (!filePicker || !filePicker.files || filePicker.files.length <= 0) {
        reject('No file selected')
        return
      }

      const pickedFile = filePicker.files[0]

      const options = {
        maxSizeMB: 300,
        maxWidthOrHeight: 400,
      }

      imageCompression(pickedFile, options)
        .then(compressedFile => {
          setFile(compressedFile)
          setImagePreview(URL.createObjectURL(compressedFile))
        })
        .catch(e => {
          console.log(e)
        })

      resolve()
    })
  }

  const closeDialog = () => {
    prop.onClose()
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMint(prev => ({ ...prev, [name]: value }))
  }

  const [isLoading, setIsLoading] = useState(false)

  const resetMint = () => {
    setImagePreview('')
    setMint({ body: '', image: '', name: '' })
  }

  useEffect(() => {
    async function upload() {
      setIsLoading(true)
      await storeBlob(new Blob([file as File]))
      setIsLoading(false)
    }

    if (file) {
      upload()
    }
  }, [file, storeBlob])

  useEffect(() => {
    function setURL() {
      setMint(prev => ({ ...prev, ['image']: `${url}` }))
    }

    if (url) setURL()
  }, [url])

  useEffect(() => {
    async function getBalance() {
      let balance = await getUserBalance()
      setBalance(balance ? parseFloat(balance) : 0)
    }
    getBalance()
  }, [])

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
                            <button onClick={() => closeDialog()} className="p-2.5 text-gray-600">
                              Cancel
                            </button>
                          </div>

                          {isLoading ? (
                            <p className="block shrink-0 p-2.5">Processing...</p>
                          ) : (
                            <MintButton
                              url={mint.image}
                              name={mint.name}
                              body={mint.body}
                              disabled={isLoading}
                              setIsLoading={setIsLoading}
                              resetMint={resetMint}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </header>
                  <div className="relative h-1/3 w-full">
                    {balance <= 0 && <NoMaticModal />}
                    {!imagePreview && (
                      <div className="h-full w-full flex justify-center items-center bg-gray-100">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#e0e0e0"
                            className="w-12 h-12"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                        </span>
                      </div>
                    )}
                    {imagePreview && <img className="h-full w-full object-cover" src={imagePreview} />}
                    <div className="absolute h-0">
                      <GenericButton
                        onClick={() => {
                          inputFileRef?.current?.click()
                        }}
                        name="Media"
                        icon={<CameraIcon />}
                        className="absolute bottom-14 left-1"
                      />
                    </div>
                  </div>

                  <div className="text-left mx-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Title"
                      value={mint.name}
                      onChange={e => onInputChange(e)}
                      className="w-full p-1 text-xl border-none mt-5 text-gray-500 font-medium"
                    />

                    <textarea
                      name="body"
                      className="w-full border-none p-1 mt-2 text-sm"
                      placeholder="Body text (Optional)"
                      id="body"
                      rows={8}
                      value={mint.body}
                      onChange={e => onInputChange(e)}
                    />

                    <div className="flex gap-5 justify-left p-3">
                      <input
                        id="image"
                        ref={inputFileRef}
                        name="image"
                        type="file"
                        accept="image/x-png, image/jpeg, image/gif"
                        onChange={() => onSelectMedia()}
                        className="bg-gray-400 p-3 hidden"
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

export default MintModal
