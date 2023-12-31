import { Fragment, ChangeEvent, useState, useEffect, FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import presets from 'data/preset_nft.json'
import {
  ArbitrumIcon,
  BNBIcon,
  CeloIcon,
  EthereumIcon,
  PolygonIcon,
  SearchIcon,
  SolanaIcon,
} from 'components/Icons/icons'
import { getNFTMetadata } from 'services/nft'
import ExpandableInput from 'components/ExpandableInput'
import { Nft } from 'lib'
import { useBoundStore } from 'store'
import { networkToChainId } from 'utils'
import ImageContainer from 'components/ImageContainer'
import GenericButton from 'components/Buttons/GenericButton'

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
    value: 'polygon',
    svg: <PolygonIcon />,
  },
  {
    name: 'Binance',
    value: 'bsc',
    svg: <BNBIcon />,
  },
  {
    name: 'Arbitrum',
    value: 'arbitrum',
    svg: <ArbitrumIcon />,
  },
  // {
  //   name: 'Solana',
  //   value: 'sln',
  //   svg: <SolanaIcon />,
  // },
]

interface SearchData {
  chain: string
  address: string
  token_id: string
}

const MentionModal = (prop: Props) => {
  const [searchData, setSearchData] = useState<SearchData>({
    chain: '',
    address: '',
    token_id: '',
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

  const handleSelectValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const [collections, setCollections] = useState<Nft[]>([])
  const [selectedImages, setSelectedImages] = useState<Nft[]>([])

  const toggleCheckbox = (index: number) => {
    const nft = collections[index]
    setSelectedImages(prevSelectedImages => {
      const found = prevSelectedImages.findIndex(
        item => item.token_id === nft.token_id && item.token_address === nft.token_address
      )
      if (found !== -1) {
        return [...prevSelectedImages.slice(0, found), ...prevSelectedImages.slice(found + 1)]
      } else {
        return [...prevSelectedImages, { ...nft }]
      }
    })
  }

  const fetchData = async () => {
    if (!searchData.address || searchData.address.length < 42 || !searchData.chain) return

    const existingNft = collections.find(
      nft => nft.token_address === searchData.address && nft.token_id === searchData.token_id
    )

    if (existingNft) return

    try {
      const response = await getNFTMetadata(searchData.address, searchData.chain, searchData.token_id)

      const nft: Nft = response.data
      nft.metaObject = JSON.parse(nft.metadata as string)
      const imageURL = (nft.metaObject as any).image
      nft.imageUrl = imageURL

      setCollections(prevCollections => [...prevCollections, { ...nft, chain_id: networkToChainId(searchData.chain) }])
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  const onDialogClose = () => {
    closeDialog()
    setCollections([])
    setSelectedImages([])
    setSearchData({
      chain: '',
      address: '',
      token_id: '',
    })
    setModalState({ newPost: { isOpen: true } })
  }

  const { setModalState } = useBoundStore()
  const handleSelect = () => {
    prop.onClickSelect(selectedImages)
    setCollections([])
    setSelectedImages([])
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
        <Dialog as="div" className="relative z-10" onClose={onDialogClose}>
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
                            <button onClick={() => onDialogClose()} className="p-2.5 text-gray-600">
                              Cancel
                            </button>
                            <button
                              onClick={handleSelect}
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

                  <div className="w-full flex flex-col max-w-md p-2">
                    <div className="w-full overflow-hidden border border-black bg-white shadow-lg p-4 text-left flex-col gap-2">
                      <div className="flex gap-2">
                        <input
                          name="token_id"
                          onChange={onHandleInputChange}
                          value={searchData.token_id}
                          placeholder="Token Id #"
                          className="w-1/2"
                        />
                        <select
                          id="chain"
                          name="chain"
                          value={searchData.chain}
                          onChange={handleSelectValueChange}
                          className="h-full w-1/2"
                        >
                          <option value="">Select chain</option>
                          {chainsLogo.map(chainLogo => (
                            <option key={chainLogo.value} value={chainLogo.value}>
                              {chainLogo.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        name="address"
                        value={searchData.address}
                        onChange={onHandleInputChange}
                        placeholder="Contract address"
                        className="w-full mt-2 text-sm"
                      />
                      <div className="mt-2 text-right">
                        <GenericButton onClick={fetchData} name="Search" icon={<SearchIcon />} className="" />
                      </div>
                    </div>

                    <div
                      className="grid gap-2 grid-cols-3 mt-3 overflow-auto max-h-[540px]"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc #f5f5f5' }}
                    >
                      {collections.map((nft, index) => {
                        const isSelected = selectedImages.some(
                          collection =>
                            collection.token_address === nft.token_address && collection.token_id === nft.token_id
                        )

                        return (
                          <div key={index} className="relative hover:brightness-75">
                            <ImageContainer
                              src={nft.imageUrl as string}
                              onClick={() => toggleCheckbox(index)}
                              classNames={`w-32 h-32 grid place-content-center rounded-md cursor-pointer border-2 ${
                                isSelected ? 'border-blue-400' : 'border-white'
                              }`}
                            />
                            <p className=" text-sm p-2 font-thin">{(nft.metaObject as any).name}</p>
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
