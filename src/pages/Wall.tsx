import CommentModal from 'components/Modal/CommentModal'
import NewPostModal from 'components/Modal/NewPostModal'
import PoapModal from 'components/Modal/PoapModal'
import SocialCard from 'components/SocialCard'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPosts } from 'repositories/rpc.repository'
import { useBoundStore } from 'store'

const PageWall = () => {
  const { token_address, token_id, chain_id, key } = useParams()

  const navigate = useNavigate()

  const { data: posts } = useGetPosts(key as string)
  const socials = posts

  const { modal, setModalState } = useBoundStore()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openPOAPModal = () => {
    setModalState({ poap: { isOpen: true } })
  }

  const goToComments = (cid: string, post: any) => {
    const { goToComments, ...rest } = post
    navigate(`/comment/${token_address}/${token_id}/${chain_id}/${cid}`, {
      state: {
        post: rest,
      },
    })
  }

  const closePOAPModal = () => {
    setModalState({ poap: { isOpen: false } })
  }

  const closeCommentModal = () => {
    setModalState({ comment: { isOpen: false, tokenId: '', tokenAddress: '', chainId: '', postCid: '' } })
  }

  return (
    <div className="h-ful">
      <div className="grid gap-0 overflow-auto pb-[120px] h-full pt-3">
        {socials &&
          socials?.map((social: any, index: number) => {
            return <SocialCard key={index} {...social} goToComments={goToComments} />
          })}
      </div>
      <div className="fixed bottom-5 right-5">
        <button
          onClick={() => openPOAPModal()}
          className="bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-sm"
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

      <PoapModal tokenId={token_id as string} isOpen={modal.poap.isOpen} onClose={closePOAPModal} />
      <CommentModal
        tokenAddress={token_address as String}
        chainId={chain_id as String}
        tokenId={token_id as string}
        isOpen={modal.comment.isOpen}
        onClose={closeCommentModal}
      />
    </div>
  )
}

export default PageWall
