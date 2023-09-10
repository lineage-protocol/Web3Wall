import { Dialog, Transition } from '@headlessui/react'
import GenericButton from 'components/Buttons/GenericButton'
import MintButton from 'components/Buttons/MintButton'
import { CameraIcon } from 'components/Icons/icons'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStoreBlob } from 'repositories/rpc.repository'

interface Props {
  isOpen: boolean
  onClose: () => void
  afterLeave?: () => void
}

const MintModal = (prop: Props) => {
  const [file, setFile] = useState<File>()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const [mint, setMint] = useState({ name: '', image: '' })
  const { data: url, mutateAsync: storeBlob } = useStoreBlob()

  const onSelectMedia = () => {
    return new Promise<void>(async (resolve, reject) => {
      const filePicker = document.getElementById('image') as HTMLInputElement

      if (!filePicker || !filePicker.files || filePicker.files.length <= 0) {
        reject('No file selected')
        return
      }

      const pickedFile = filePicker.files[0]
      setFile(pickedFile)
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

    if (file) upload()
  }, [file])

  useEffect(() => {
    async function setURL() {
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full text-center max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Mint Event
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Enter event name & upload desired logo</p>
                  </div>

                  <div className="flex flex-col justify-center items-center mt-2">
                    <input type="text" name="name" value={mint.name} onChange={e => onInputChange(e)} />

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
                        id="image"
                        ref={inputFileRef}
                        name="image"
                        type="file"
                        accept="image/x-png, image/jpeg, image/gif"
                        onChange={() => onSelectMedia()}
                        className="bg-gray-400 p-3 hidden"
                      />
                    </div>

                    {file && (
                      <>
                        <label>Image name:</label>
                        <p className="text-ellipsis overflow-hidden w-[260px]">{file.name}</p>
                      </>
                    )}
                  </div>

                  <div className="mt-4">
                    {isLoading ? (
                      <p>Uploading image...</p>
                    ) : (
                      <MintButton url={mint.image} name={mint.name} disabled={isLoading} />
                    )}
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
