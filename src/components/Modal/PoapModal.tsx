import { Dialog, Transition } from '@headlessui/react'
import PoapButton from 'components/Buttons/PoapButton'
import { Fragment } from 'react'

interface Props {
  tokenId: string
  isOpen: boolean
  onClose: () => void
  afterLeave?: () => void
}

const PoapModal = (prop: Props) => {
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
                  <header className="bg-gray-50">
                    <div className="px-4">
                      <div className="">
                        <div className="flex justify-between">
                          <div className="relative flex items-center">
                            <button onClick={() => closeDialog()} className="p-2.5 text-gray-600">
                              Cancel
                            </button>
                          </div>

                          <PoapButton tokenId={prop.tokenId} disabled={false} />
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="w-full text-left mt-5 p-3">
                    <h3 className="font-semibold text-xl">Become Co-owner of this Subject</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      By acquiring a share, you don't just own a piece; you play an integral role in the forum's
                      evolution. Each share you hold signifies your influence in the discussions, decisions, and the
                      overall direction of this community. It's not just about ownership—it's about being a part of
                      shaping our collective future.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <strong>Coming Up Next:</strong> Stay tuned as we introduce a feature where all ad revenues
                      generated from this forum will be evenly distributed among its shareholders. Your share isn’t just
                      symbolic—it has real value.
                    </p>
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

export default PoapModal
