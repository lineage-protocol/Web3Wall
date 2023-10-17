import { Dialog, Transition } from '@headlessui/react'
import PoapButton from 'components/Buttons/PoapButton'
import { BadgeSolidIcon } from 'components/Icons/icons'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { Fragment, useEffect, useState } from 'react'

interface Props {
  tokenId: string
  isOpen: boolean
  onClose: () => void
  afterLeave?: () => void
}

const PoapModal = (prop: Props) => {
  const { getUserBalance } = useWeb3Auth()
  const [balance, setBalance] = useState<number>(0)

  const closeDialog = () => {
    prop.onClose()
  }

  useEffect(() => {
    async function getBalance() {
      const balance = await getUserBalance()
      setBalance(balance ? parseFloat(balance) : 0)
    }
    getBalance().catch(e => console.log(e))
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

          <div className="max-w-md mx-auto fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-300 transform"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-200 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
              >
                <Dialog.Panel className="w-full h-1/2 fixed max-w-md bottom-0 text-center transform overflow-hidden bg-white align-middle shadow-xl transition-all">
                  {/* <div className="w-full text-left mt-5 p-3">
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
                  </div> */}
                  {balance <= 0 && (
                    <div className="w-full bg-yellow-100 p-3 text-left">
                      <p className="text-sm text-yellow-700">You need $MATIC to mint</p>
                    </div>
                  )}
                  <div className="w-full text-left mt-5 p-3">
                    <h3 className="font-semibold text-xl flex items-center gap-1">
                      Mint Your POAP Badge <BadgeSolidIcon />
                    </h3>
                    <p className="mt-2 text-sm p-2 bg-green-100 border border-green-300">
                      POAP (Proof of Attendance Protocol) is a digital badge that proves your participation.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      By minting this badge, you're securing a digital token that verifies your participation. Simply
                      follow the next steps to claim your unique badge and showcase your involvement.
                    </p>
                  </div>
                  <div className="flex mt-2 items-center justify-center">
                    <div className="w-1/2">
                      <PoapButton tokenId={prop.tokenId} disabled={false} />
                    </div>
                    <button onClick={() => closeDialog()} className="p-2 w-1/2">
                      Cancel
                    </button>
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
