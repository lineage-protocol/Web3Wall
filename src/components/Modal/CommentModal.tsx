import { Dialog, Transition } from '@headlessui/react'
import { useOneSignal } from 'hooks/use-onesignal'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useState, Fragment } from 'react'
import { usePublishTransaction } from 'repositories/rpc.repository'
import { useBoundStore } from 'store'

interface Props {
  tokenId: String
  tokenAddress: String
  chainId: String
  isOpen: boolean
  onClose: () => void
  afterLeave?: () => void
}

const CommentModal = (prop: Props) => {
  const [text, setText] = useState('')
  const [textRows, setTextRows] = useState(8)
  const { modal } = useBoundStore()

  const { mutateAsync: publishTx } = usePublishTransaction()
  const { signMessage, getAccounts } = useWeb3Auth()
  const { sendNotification } = useOneSignal()

  const closeDialog = () => {
    setText('')
    prop.onClose()
  }

  const onClickReply = async () => {
    const account = await getAccounts()
    if (!account) return

    const content = {
      cid: modal.comment.postCid,
      content: {
        text,
        medias: [],
      },
    }

    const data = JSON.stringify(content)
    const signed = await signMessage(data)

    await publishTx({
      alias: '',
      chain_id: prop.chainId as string,
      signature: signed?.signature as string,
      data,
      mcdata: JSON.stringify({ loose: 0 }),
      meta_contract_id: `${import.meta.env.VITE_WEB3WALL_COMMENT_META_CONTRACT_ID}`,
      method: 'metadata',
      public_key: account as string,
      token_address: prop.tokenAddress as string,
      token_id: prop.tokenId as string,
      version: modal.comment.postCid,
    })

    await sendNotification({ title: 'New comment', description: content.content.text })

    closeDialog()
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

                          <button
                            onClick={() => onClickReply()}
                            className="block shrink-0 p-2.5 font-semibold  text-blue-600"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="w-screen flex flex-col">
                    <label className="sr-only" htmlFor="message">
                      Message
                    </label>

                    <textarea
                      className="mt-5 border-none p-3 text-sm"
                      placeholder="Add a comment"
                      id="message"
                      rows={textRows}
                      value={text}
                      onChange={e => {
                        setText(e.target.value)
                      }}
                    />
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

export default CommentModal
