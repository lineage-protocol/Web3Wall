import CommentCard from 'components/CommentCard'
import CommentModal from 'components/Modal/CommentModal'
import { useParams } from 'react-router-dom'
import { useGetComments } from 'repositories/rpc.repository'
import { useBoundStore } from 'store'

const PageComment = () => {
  const { token_address, token_id, chain_id, cid } = useParams()
  const { data: comments } = useGetComments(cid as string)
  const { modal, setModalState } = useBoundStore()

  const openNewCommentModal = () => {
    setModalState({
      comment: {
        isOpen: true,
        tokenId: token_id as string,
        tokenAddress: token_address as string,
        chainId: chain_id as string,
        postCid: cid as string,
      },
    })
  }

  const closeCommentModal = () => {
    setModalState({ comment: { isOpen: false, tokenId: '', tokenAddress: '', chainId: '', postCid: '' } })
  }

  return (
    <div className="h-ful">
      <div className="grid gap-0 overflow-auto pb-[120px] h-full pt-3">
        {comments &&
          comments?.map((comment: any, index: number) => {
            return <CommentCard key={index} {...comment} />
          })}
      </div>
      <div className="fixed bottom-5 right-5">
        <button
          onClick={() => openNewCommentModal()}
          className="bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-2xl"
        >
          +
        </button>
      </div>
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

export default PageComment
