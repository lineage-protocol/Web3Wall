import { Fragment, ChangeEvent, useState, useEffect, FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import presets from 'data/preset_nft.json'
import { ArbitrumIcon, BNBIcon, CeloIcon, EthereumIcon, PolygonIcon, SolanaIcon } from 'components/Icons/icons'
import { getNFTMetadata } from 'services/nft'
import ExpandableInput from 'components/ExpandableInput'
import { Nft } from 'lib'
import { useBoundStore } from 'store'
import { networkToChainId } from 'utils'

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
      if (imageURL && imageURL.startsWith('ipfs://')) {
        nft.imageUrl = imageURL.replace('ipfs://', import.meta.env.VITE_IPFS_GATEWAY_URL)
      }

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

  const onClickFastNFT = (index: number) => {
    const nft = presets[index]
    setSearchData({
      chain: nft.chain,
      address: nft.address,
      token_id: '0',
    })
  }

  const { setModalState } = useBoundStore()
  const handleSelect = () => {
    prop.onClickSelect(selectedImages)
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

                  <div className="w-screen flex flex-col max-w-md p-2">
                    <div>
                      <div className="relative mt-2 gap-2 flex items-center">
                        <div className="flex items-center">
                          <span className="text-gray-500 text-sm mr-2">NFT with Token ID</span>
                          <ExpandableInput
                            name="token_id"
                            onBlur={fetchData}
                            onChange={onHandleInputChange}
                            value={searchData.token_id}
                            placeholder="0"
                            initialWidth={20}
                            extraPadding={10}
                          />
                        </div>
                        <span className="text-gray-500 text-sm">at</span>
                        <select
                          id="chain"
                          name="chain"
                          value={searchData.chain}
                          onChange={handleSelectValueChange}
                          onBlur={fetchData}
                          className="h-full border-b-2 rounded-none text-md border-0 bg-transparent py-0  text-black font-medium border-b-black outline-indigo-600"
                        >
                          <option value="">None</option>
                          {chainsLogo.map(chainLogo => (
                            <option key={chainLogo.value} value={chainLogo.value}>
                              {chainLogo.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative mt-2 gap-2 flex items-center">
                        <span className="text-gray-500 text-sm">and</span>
                        <ExpandableInput
                          name="address"
                          value={searchData.address}
                          onBlur={fetchData}
                          onChange={onHandleInputChange}
                          placeholder="Contract address"
                          initialWidth={150}
                          extraPadding={-50}
                        />
                      </div>
                    </div>
                    <div
                      className="mt-3 overflow-x-scroll flex flex-cols gap-2"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc #f5f5f5' }}
                    >
                      <div className="flex gap-1">
                        {presets.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => onClickFastNFT(index)}
                            className="p-0 rounded-lg px-4 py-2 m-1 bg-gray-200 text-gray-700 text-xs whitespace-nowrap"
                          >
                            {preset.name}
                          </button>
                        ))}
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
                            <img
                              src={nft.imageUrl as string}
                              onClick={() => toggleCheckbox(index)}
                              className={`w-32 h-32 grid place-content-center rounded-md cursor-pointer border-2 ${
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
