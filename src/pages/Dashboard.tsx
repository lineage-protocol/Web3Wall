import GenericButton from 'components/Buttons/GenericButton'
import EventCard from 'components/EventCard'
import MintModal from 'components/Modal/MintModal'
import { useGetEvents } from 'repositories/subgraph.repository'
import { useBoundStore } from 'store'

const PageDashboard = () => {
  const { modal, setModalState } = useBoundStore()
  const { data: events } = useGetEvents({})

  const openModal = () => {
    setModalState({ mint: { isOpen: true } })
  }

  const closeModal = () => {
    setModalState({ mint: { isOpen: false } })
  }

  return (
    <div className="bg-yellow-100 h-screen">
      <GenericButton className="ml-4 mt-4" name="New Event" onClick={() => openModal()} />
      <div className="grid gap-3 p-3">
        {events &&
          events.map((item, index) => {
            return (
              <EventCard
                key={index}
                tokenAddress={import.meta.env.VITE_WEB3WALL_NFT}
                chainId={import.meta.env.VITE_DEFAULT_CHAIN_ID}
                tokenId={item.tokenId}
                title={item?.data.name}
                onHandleShareClicked={() => {}}
                totalUser={0}
                totalPost={0}
              />
            )
          })}
      </div>
      <MintModal isOpen={modal.mint.isOpen} onClose={closeModal} />
    </div>
  )
}

export default PageDashboard
