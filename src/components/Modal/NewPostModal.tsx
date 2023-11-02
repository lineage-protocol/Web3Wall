import { Dialog, Transition } from '@headlessui/react'
import GenericButton from 'components/Buttons/GenericButton'
import { CameraIcon, CloseIcon, CloseSmallIcon, LoadingSpinner, MentionIcon } from 'components/Icons/icons'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useGetMetadata, usePublishTransaction, useStoreBlob } from 'repositories/rpc.repository'
import imageCompression from 'browser-image-compression'
import { v4 } from 'uuid'
import { useAlertMessage } from 'hooks/use-alert-message'
import { useBoundStore } from 'store'
import MentionModal from './MentionModal'
import DOMPurify from 'dompurify'
import { Nft } from 'lib'
import { formatDataKey } from 'utils'
import { Transaction } from 'services/rpc'
import ImageContainer from 'components/ImageContainer'

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
  // onClickSelect: (selectedImages: any) => void
}

const NewPostModal = (prop: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | Blob>()
  const [textRows, setTextRows] = useState(8)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { modal, setModalState } = useBoundStore()
  const [tagNFTs, setTagNFTs] = useState<Nft[]>([])

  const { mutateAsync: storeBlob } = useStoreBlob()
  const { mutateAsync: publishTx } = usePublishTransaction()
  const { mutateAsync: getMetadata } = useGetMetadata()

  const { signMessage, getAccounts } = useWeb3Auth()
  const { showError, showSuccess } = useAlertMessage()

  const createMention = async (content: any, tx_data: Transaction) => {
    const signed = await signMessage(JSON.stringify(content))
    return await publishTx({ ...tx_data, signature: signed?.signature as string })
  }

  const onPost = async (): Promise<void> => {
    const account = await getAccounts()
    if (!account) {
      return
    }
    setIsLoading(true)
    let url = ''
    if (file) url = await storeBlob(new Blob([file]))

    const content = {
      text: DOMPurify.sanitize(text.replace(/'/g, '’')),
      image: url,
    }

    try {
      const signed = await signMessage(JSON.stringify(content))
      const version = v4()

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
        version,
      })

      const mentions = tagNFTs

      setTimeout(async () => {
        if (mentions.length > 0) {
          const data_key = formatDataKey(prop.chainId, prop.tokenAddress, prop.tokenId)

          const data = {
            data_key,
            meta_contract_id: `${import.meta.env.VITE_WEB3WALL_META_CONTRACT_ID}`,
            public_key: account,
            version,
          }

          const metadata = await getMetadata(data)

          const promises: any[] = []

          for (let i = 0; i < mentions.length; i++) {
            const mention = mentions[i]
            const content = { cid: metadata.cid }

            promises.push(
              createMention(content, {
                alias: '',
                chain_id: prop.chainId as string,
                signature: '',
                data: JSON.stringify(content),
                mcdata: JSON.stringify({ loose: 0 }),
                meta_contract_id: `${import.meta.env.VITE_MENTION_META_CONTRACT_ID}`,
                method: 'metadata',
                public_key: account as string,
                token_address: mention.token_address as string,
                token_id: mention.token_id as string,
                version: metadata.cid as string,
              })
            )
          }

          await Promise.all(promises)
        }
      }, 5000)

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
    setTagNFTs([])

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
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1280,
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

  const handleSelectedImages = (selectedImages: []) => {
    const areNFTsSimilar = (nft1: any, nft2: any) => {
      return (
        nft1.chain_id === nft2.chain_id && nft1.token_address === nft2.token_address && nft1.token_id === nft2.token_id
      )
    }
    const uniqueNFT = selectedImages.filter(image => !tagNFTs.some(existingNFT => areNFTsSimilar(existingNFT, image)))
    setTagNFTs([...tagNFTs, ...uniqueNFT])
    setModalState({ newPost: { isOpen: true } })
    closeMentionModal()
  }

  const removeTaggedNFT = (nftToRemove: Nft) => {
    const updatedNFTs = tagNFTs.filter(nft => nft !== nftToRemove)
    setTagNFTs(updatedNFTs)
  }

  const openMentionModal = () => {
    setModalState({ mention: { isOpen: true } })
  }

  const closeMentionModal = () => {
    setModalState({ mention: { isOpen: false } })
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

                    <div className="flex flex-wrap gap-3 justify-left p-2">
                      {tagNFTs &&
                        tagNFTs.map((nft, index) => (
                          <div key={index} className="relative">
                            <ImageContainer
                              src={nft.imageUrl as string}
                              key={index}
                              classNames="w-32 h-32 grid place-content-center"
                            />
                            <div className="absolute top-0 right-6 p-2 h-5 w-5">
                              <button
                                className="hover:bg-gray-800/20 bg-gray-800 text-white rounded-full p-1"
                                onClick={() => removeTaggedNFT(nft)}
                              >
                                <CloseSmallIcon />
                              </button>
                            </div>
                            <div className="absolute top-0 left-0 p-2 h-5 w-5">{nft.chain_id}</div>
                          </div>
                        ))}
                    </div>

                    <div className="flex gap-5 p-3 justify-center">
                      <GenericButton
                        onClick={() => {
                          inputFileRef?.current?.click()
                        }}
                        name="Media"
                        icon={<CameraIcon />}
                        className="w-1/2"
                      />
                      <GenericButton
                        onClick={() => {
                          openMentionModal()
                        }}
                        name="NFT"
                        icon={<MentionIcon />}
                        className="w-1/2"
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <MentionModal isOpen={modal.mention.isOpen} onClose={closeMentionModal} onClickSelect={handleSelectedImages} />
    </>
  )
}

export default NewPostModal
