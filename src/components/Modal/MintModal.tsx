import { Dialog, Transition } from '@headlessui/react'
import GenericButton from 'components/Buttons/GenericButton'
import MintButton from 'components/Buttons/MintButton'
import { CameraIcon } from 'components/Icons/icons'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useStoreBlob } from 'repositories/rpc.repository'
import imageCompression from 'browser-image-compression'
interface Props {
  isOpen: boolean
  onClose: () => void
  afterLeave?: () => void
}

const MintModal = (prop: Props) => {
  const [file, setFile] = useState<File | Blob>()
  const [imagePreview, setImagePreview] = useState('')
  const inputFileRef = useRef<HTMLInputElement>(null)

  const [mint, setMint] = useState({ name: '', image: '' })
  const { data: url, mutateAsync: storeBlob } = useStoreBlob()

  const onSelectMedia = () => {
    return new Promise<void>((resolve, reject) => {
      const filePicker = document.getElementById('image') as HTMLInputElement

      if (!filePicker || !filePicker.files || filePicker.files.length <= 0) {
        reject('No file selected')
        return
      }

      const pickedFile = filePicker.files[0]

      console.log(`originalFile size ${pickedFile.size / 1024 / 1024} MB`)

      const options = {
        maxSizeMB: 300,
        maxWidthOrHeight: 400,
      }

      imageCompression(pickedFile, options)
        .then(compressedFile => {
          console.log(compressedFile.size / 1024 / 1024)
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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMint(prev => ({ ...prev, [name]: value }))
  }

  const [isLoading, setIsLoading] = useState(false)

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
                            <MintButton url={mint.image} name={mint.name} disabled={isLoading} />
                          )}
                        </div>
                      </div>
                    </div>
                  </header>
                  <div className="relative h-1/3 w-full">
                    <img
                      className="h-full w-full object-cover"
                      src={
                        imagePreview ||
                        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
                      }
                    />
                    <div className="absolute">
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

                  <div className="text-left mt-5 p-3">
                    <label htmlFor="name" className="block text-2xl font-semi text-gray-500">
                      Start creating your event!
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Give your event a title"
                      value={mint.name}
                      onChange={e => onInputChange(e)}
                      className="w-full p-0 text-xl border-none mt-5 text-gray-400"
                    />
                    <hr />

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
