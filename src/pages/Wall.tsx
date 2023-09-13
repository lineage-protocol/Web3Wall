import NewPostModal from 'components/Modal/NewPostModal'
import PoapModal from 'components/Modal/PoapModal'
import SocialCard from 'components/SocialCard'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPosts } from 'repositories/rpc.repository'

const PageWall = () => {
  const { token_address, token_id, chain_id, key } = useParams()
  const { data: posts } = useGetPosts(key as string)
  const socials = posts

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPOAPModalOpen, setIsPOAPModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openPOAPModal = () => {
    setIsPOAPModalOpen(true)
  }

  const closePOAPModal = () => {
    setIsPOAPModalOpen(false)
  }

  return (
    <div className="h-ful">
      <div className="grid gap-3 overflow-auto pb-10 h-full pt-5">
        {socials &&
          socials?.map((social: any, index: number) => {
            return <SocialCard key={index} {...social} />
          })}
      </div>
      <div className="fixed bottom-5 right-5 ">
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-2xl"
        >
          POAP
        </button>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-2xl"
        >
          +
        </button>
      </div>
      <NewPostModal
        id={key as String}
        tokenId={token_id as String}
        tokenAddress={token_address as String}
        chainId={chain_id as String}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <PoapModal tokenId={token_id} isOpen={isPOAPModalOpen} onClose={closePOAPModal} />
    </div>
  )
}

export default PageWall
