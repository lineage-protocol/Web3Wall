import { Fragment, ChangeEvent, useState, useEffect, FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EvmChain } from '@moralisweb3/common-evm-utils'
import GenericButton from 'components/Buttons/GenericButton'
import {
  ArbitrumIcon,
  BNBIcon,
  CeloIcon,
  EthereumIcon,
  MumbaiIcon,
  NearIcon,
  PolygonIcon,
  SolanaIcon,
} from 'components/Icons/icons'
import { getNftsCollection } from 'services/nft'
import instance from 'adapter/moralis'

interface Props {
  isOpen: boolean
  onClose: () => void
  afterLeave?: () => void
  onClickSelect: (selectedImages: any) => void
}

// Data and its interface
interface Chains {
  name: string
  value: string
  svg: JSX.Element
}

const chainsLogo: Chains[] = [
  {
    name: 'Ethereum',
    value: 'eth',
    svg: <EthereumIcon />,
  },
  {
    name: 'Polygon',
    value: 'pgn',
    svg: <PolygonIcon />,
  },
  {
    name: 'BNB',
    value: 'bnb',
    svg: <BNBIcon />,
  },
  {
    name: 'Arbitrum',
    value: 'arb',
    svg: <ArbitrumIcon />,
  },
  {
    name: 'Celo',
    value: 'clo',
    svg: <CeloIcon />,
  },
  {
    name: 'Solana',
    value: 'sln',
    svg: <SolanaIcon />,
  },
  {
    name: 'Near',
    value: 'nar',
    svg: <NearIcon />,
  },
  {
    name: 'Mumbai',
    value: 'mba',
    svg: <MumbaiIcon />,
  },
]

interface SearchData {
  chain: string
  address: string
}

interface Collections {
  name: string
  metadata?: string
}

const MentionModal = (prop: Props) => {
  const [searchData, setSearchData] = useState<SearchData>({
    chain: '',
    address: '',
  })

  const onHandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const closeDialog = () => {
    prop.onClose()
  }

  // Handling data changes
  const [selectedValue, setSelectedValue] = useState<string>(chainsLogo[0].value)

  const handleSelectValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value)
  }

  const [collections, setCollections] = useState<Collections[]>([])

  // Fetch Endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        await instance

        const address = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'
        const chain = EvmChain.ETHEREUM

        const response = await getNftsCollection(address, chain)
        setCollections(response.raw.result)
      } catch (error) {
        console.log((error as Error).message)
      }
    }

    void fetchData()
  }, [])

  // Handle Image Selection
  const [selectedImages, setSelectedImages] = useState<any[]>([])
  const maxSelection = 3

  const toggleCheckbox = (collection: any) => {
    const { imageId } = collection
    if (selectedImages.find(clt => clt.imageId === imageId)) {
      setSelectedImages(selectedImages.filter(clt => clt.imageId !== imageId))
    } else if (selectedImages.length < maxSelection) {
      setSelectedImages([...selectedImages, collection])
    }
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
                          <div className="relative flex justify-between min-w-full">
                            <button onClick={() => closeDialog()} className="p-2.5 text-gray-600">
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                closeDialog()
                                prop.onClickSelect(selectedImages)
                              }}
                              className={`p-2.5 text-gray-600 rounded-md cursor-default ${
                                selectedImages.length > 0 && 'bg-purple-400 font-medium text-white hover:cursor-pointer'
                              }`}
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="w-screen flex flex-col max-w-md p-2">
                    <div>
                      <div className="relative mt-2 border border-gray-300 rounded-md shadow-md flex justify-between ">
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className="block w-8/12 rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 text-sm sm:leading-6 outline-indigo-600"
                          placeholder="Contract Address"
                        />
                        <div className="absolute w-4/12 inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Network
                          </label>

                          <span className="grid place-content-center pr-2">
                            {chainsLogo.find(chainLogo => chainLogo.value === selectedValue)?.svg}
                          </span>
                          <select
                            id="currency"
                            name="currency"
                            value={selectedValue}
                            onChange={handleSelectValueChange}
                            className="h-full rounded-md border-0 bg-transparent py-0  text-gray-500 text-sm outline-indigo-600"
                          >
                            {chainsLogo.map(chainLogo => (
                              <option key={chainLogo.value} value={chainLogo.value}>
                                {chainLogo.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div
                      className="mt-3 overflow-x-scroll flex flex-cols gap-2"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc #f5f5f5' }}
                    >
                      <div className="flex gap-1">
                        {collections.map((collection, index) => (
                          <button
                            key={index}
                            className="p-0 rounded-lg px-4 py-2 m-1 bg-gray-200 text-gray-700 text-sm whitespace-nowrap"
                          >
                            {collection.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      className="grid gap-2 grid-cols-3 mt-3 overflow-auto max-h-[540px]"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc #f5f5f5' }}
                    >
                      {collections.map((collection, index) => {
                        const metadataString = collection.metadata
                        const metadataConvertObject = JSON.parse(metadataString!)
                        const imageURL = metadataConvertObject?.image
                        const imageId = index
                        const collectionWithIndex = { imageId, ...collection }
                        const isSelected = selectedImages.find(collection => collection.imageId === imageId)

                        return (
                          <div key={imageId} className="relative hover:brightness-75">
                            <img
                              src={imageURL}
                              alt="placeholder"
                              onClick={() => toggleCheckbox(collectionWithIndex)}
                              className=" w-32 h-32 grid place-content-center border rounded-md cursor-pointer"
                            />
                            <p className=" text-sm p-2 font-thin">{collection.name}</p>
                            {isSelected && (
                              <div className="absolute top-0 left-0 p-2 h-5 w-5">
                                <input type="checkbox" checked={isSelected} readOnly />
                              </div>
                            )}
                          </div>
                        )
                      })}
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
