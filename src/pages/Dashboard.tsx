import GenericButton from 'components/Buttons/GenericButton'
import EventCard from 'components/EventCard'
import { AddIcon } from 'components/Icons/icons'
import MintModal from 'components/Modal/MintModal'
import ProofModal from 'components/Modal/ProofModal'
import { useState } from 'react'
import { useGetEvents } from 'repositories/subgraph.repository'
import { useBoundStore } from 'store'

const PageDashboard = () => {
  const { modal, setModalState } = useBoundStore()
  const { data: events } = useGetEvents({
    where: { blockNumber_gte: import.meta.env.VITE_WEB3WALL_SUBGRAPH_START_BLOCK, data_not: '0x', tokenId_gte: '3' },
  })
  const [search, setSearch] = useState('')

  const openModal = () => {
    setModalState({ mint: { isOpen: true } })
  }

  const openProofModal = (tokenId: string) => {
    setModalState({ proof: { isOpen: true, tokenId: tokenId } })
  }

  const closeModal = () => {
    setModalState({ mint: { isOpen: false } })
  }

  const closeProofModal = () => {
    setModalState({ proof: { isOpen: false, tokenId: '' } })
  }

  const filteredEvents = events?.filter(event => event?.data.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="h-screen pt-5">
      <div className="flex items-center p-3">
        <div className="relative flex-1">
          <label className="sr-only" htmlFor="search">
            {' '}
            Search{' '}
          </label>

          <input
            className="h-10 w-full p-6 border border-black bg-white pe-10 ps-4 text-sm shadow-sm"
            id="search"
            type="search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <button
            type="button"
            className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-black transition"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <GenericButton className="flex-none ml-3" name="" icon={<AddIcon />} onClick={() => openModal()} />
      </div>
      <div className="grid gap-2 p-1">
        {filteredEvents &&
          filteredEvents.map((item, index) => {
            return (
              <EventCard
                key={index}
                tokenAddress={import.meta.env.VITE_WEB3WALL_NFT}
                chainId={import.meta.env.VITE_DEFAULT_LINEAGE_CHAIN}
                tokenId={item.tokenId}
                title={item?.data.name}
                content={item?.data.body ?? ''}
                imageUrl={item?.data.image}
                onHandleShareClicked={() => {}}
                totalUser={0}
                totalPost={0}
                onProofClicked={() => openProofModal(item.tokenId)}
              />
            )
          })}
      </div>
      <MintModal isOpen={modal.mint.isOpen} onClose={closeModal} />
      <ProofModal tokenId={modal.proof.tokenId} isOpen={modal.proof.isOpen} onClose={closeProofModal} />
    </div>
  )
}

export default PageDashboard
