import CommentModal from 'components/Modal/CommentModal'
import NewPostModal from 'components/Modal/NewPostModal'
import PoapModal from 'components/Modal/PoapModal'
import SocialCard from 'components/SocialCard'
import { RWebShare } from 'react-web-share'
import { useAlertMessage } from 'hooks/use-alert-message'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPosts } from 'repositories/rpc.repository'
import { useBoundStore } from 'store'

const PageWall = () => {
  const { token_address, token_id, chain_id, key } = useParams()
  const [socials, setSocials] = useState<any>([])

  const navigate = useNavigate()

  const { data } = useGetPosts(key as string)

  const { modal, setModalState } = useBoundStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState('')

  const { showError } = useAlertMessage()
  const { getAccounts } = useWeb3Auth()

  const openModal = () => {
    if (account) {
      setIsModalOpen(true)
    } else {
      showError(`Please login to post content`)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openPOAPModal = () => {
    setModalState({ poap: { isOpen: true } })
  }

  const goToComments = (cid: string) => {
    navigate(`/comment/${token_address}/${token_id}/${chain_id}/${cid}`)
  }

  const closePOAPModal = () => {
    setModalState({ poap: { isOpen: false } })
  }

  const closeCommentModal = () => {
    setModalState({ comment: { isOpen: false, tokenId: '', tokenAddress: '', chainId: '', postCid: '' } })
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (data) {
      timeoutId = setTimeout(() => {
        setSocials(data)
        setIsLoading(false)
      }, 1000)
    }

    return () => {
      clearTimeout(timeoutId)
      setSocials([])
    }
  }, [data])

  useEffect(() => {
    const getAccount = async () => {
      try {
        const acc = await getAccounts()
        if (acc) {
          setAccount(acc as string)
        }
      } catch (e) {
        setAccount('')
      }
    }

    getAccount().catch(e => console.log(e))
  })

  return (
    <div className="h-full">
      {isLoading && (
        <div className="text-center mt-5">
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
            Loading
          </span>
        </div>
      )}
      {!isLoading && socials.length > 0 && (
        <div className="grid gap-0 overflow-auto pb-[120px] h-full pt-3">
          {socials &&
            socials?.map((social: any, index: number) => {
              return <SocialCard key={index} {...social} goToComments={goToComments} />
            })}
        </div>
      )}
      <div className="fixed bottom-5 right-5 flex flex-col space-y-2 items-end">
        {account && (
          <button
            onClick={() => openPOAPModal()}
            className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded-full flex items-center justify-center text-sm"
          >
            Mint Ownership
          </button>
        )}
        <RWebShare
          data={{
            title: 'W3wall',
            url: `${window.location.origin}/wall/${token_address}/${token_id}/${chain_id}/${key}`,
            text: 'Check this out',
          }}
          onClick={() => {}}
        >
          <div className="bg-blue-500 text-white hover:bg-blue-400 h-12 w-12 rounded-full flex items-center justify-center text-2xl">
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
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </div>
        </RWebShare>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white hover:bg-blue-400  h-12 w-12 rounded-full flex items-center justify-center text-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
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
