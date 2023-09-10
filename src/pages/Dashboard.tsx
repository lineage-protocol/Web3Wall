import GenericButton from 'components/Buttons/GenericButton'
import EventCard from 'components/EventCard'
import MintModal from 'components/Modal/MintModal'
import { useState } from 'react'
import { useGetTransactions } from 'repositories/rpc.repository'
import { useGetEvents } from 'repositories/subgraph.repository'

const items = [
  {
    token: {
      token_address: '0xD5123C9FB1206497E2e54fd1120AA2F896e273E9',
      token_id: '1',
      chain_id: 'mumbai',
    },
    title: 'Token 2049',
    users: 1,
    posts: 5,
  },
  {
    token: {
      token_address: '0xD5123C9FB1206497E2e54fd1120AA2F896e273E9',
      token_id: '2',
      chain_id: 'mumbai',
    },
    title: 'MadLabs Gathering',
    users: 2,
    posts: 6,
  },
]

const PageDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const { data: events } = useGetEvents({})
  const { data: txs } = useGetTransactions({
    query: [
      {
        column: 'method',
        op: '=',
        query: 'metadata',
      },
      {
        column: 'status',
        op: '=',
        query: '1',
      },
      {
        column: 'meta_contract_id',
        op: '=',
        query: `${import.meta.env.VITE_WEB3WALL_META_CONTRACT_ID}`,
      },
    ],
    ordering: [
      {
        column: 'timestamp',
        sort: 'desc',
      },
    ],
    from: 0,
    to: 0,
  })

  return (
    <div className="bg-yellow-100 h-screen">
      <GenericButton className="ml-4 mt-4" name="New Event" onClick={() => openModal()} />
      <div className="grid gap-3 p-3">
        {txs && txs.length > 0
          ? txs.map((item, index) => {
              return (
                <EventCard
                  key={index}
                  tokenAddress={item.token_address}
                  chainId={item.chain_id}
                  tokenId={item.token_id}
                  title={events?.[`${item.data_key}`].data?.name}
                  onHandleShareClicked={() => {}}
                  totalUser={0}
                  totalPost={0}
                />
              )
            })
          : items.map((item, index) => {
              return (
                <EventCard
                  key={index}
                  tokenAddress={item.token.token_address}
                  chainId={item.token.chain_id}
                  tokenId={item.token.token_id}
                  title={item.title}
                  onHandleShareClicked={() => {}}
                  totalUser={item.users}
                  totalPost={item.posts}
                />
              )
            })}
      </div>
      <MintModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default PageDashboard
