import CommentCard from 'components/CommentCard'
import CommentModal from 'components/Modal/CommentModal'
import SocialCard from 'components/SocialCard'
import { useLocation, useParams } from 'react-router-dom'
import { useGetComments } from 'repositories/rpc.repository'
import { useBoundStore } from 'store'

const PageComment = () => {
  const { token_address, token_id, chain_id, cid } = useParams()
  const { state } = useLocation()
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
        <SocialCard {...state.post} noOfComments={comments?.length} />
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
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
