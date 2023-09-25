import { Dialog, Transition } from '@headlessui/react'
import PoapButton from 'components/Buttons/PoapButton'
import { useState, useRef, Fragment } from 'react'

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

  const closeDialog = () => {
    setText('')
    prop.onClose()
  }

  const onClickReply = () => {
    alert(text)
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
