import NewPostModal from 'components/Modal/NewPostModal'
import SocialCard from 'components/SocialCard'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPosts } from 'repositories/rpc.repository'

const PageWall = () => {
  const { token_address, token_id, chain_id, key } = useParams()
  const { data: posts } = useGetPosts(key as string)
  const socials = posts

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="h-ful">
      <div className="grid gap-3 overflow-auto pb-10 h-full pt-5">
        {socials &&
          socials?.map((social: any, index: number) => {
            return <SocialCard key={index} {...social} />
          })}
      </div>
      <button
        onClick={() => openModal()}
        className="fixed bottom-5 right-5 bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-2xl"
      >
        +
      </button>
      <NewPostModal
        id={key as String}
        tokenId={token_id as String}
        tokenAddress={token_address as String}
        chainId={chain_id as String}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}

export default PageWall
