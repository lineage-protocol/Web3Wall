import { Dialog, Transition } from '@headlessui/react'
import GenericButton from 'components/Buttons/GenericButton'
import { Fragment, useState } from 'react'

const collections = [
  {
    name: 'W3Wall',
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    chain: 'eth',
  },
  {
    name: 'Bored Ape Yacht Club',
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    chain: 'eth',
  },
]

interface Props {
  isOpen: boolean
  onClose: () => void
  afterLeave?: () => void
}

interface SearchData {
  chain: string
  address: string
}

const MentionModal = (prop: Props) => {
  const [searchData, setSearchData] = useState<SearchData>({
    chain: '',
    address: '',
  })

  const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchData(prevState => ({
      ...prevState,
      [name]: value,
    }))
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

          <div className="fixed inset-0 overflow-y-auto max-w-md mx-auto">
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
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="w-screen flex flex-col max-w-md p-2">
                    <div>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Contract Address"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Network
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                          >
                            <option>Ethereum</option>
                            <option>Polygon</option>
                            <option>Binance</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-cols gap-2">
                      {collections.map(collection => (
                        <button className="p-0 rounded-lg px-4 py-2 bg-gray-200 text-gray-700 text-sm">
                          {collection.name}
                        </button>
                      ))}
                    </div>

                    <div className="grid gap-2 grid-cols-3 mt-3">
                      <div className="">
                        <img
                          src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                          alt=""
                          className="h-full w-full object-cover opacity-100 group-hover:opacity-0"
                        />
                      </div>
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

export default MentionModal
