import CommentModal from 'components/Modal/CommentModal'
import NewPostModal from 'components/Modal/NewPostModal'
import PoapModal from 'components/Modal/PoapModal'
import SocialCard from 'components/SocialCard'
import { RWebShare } from 'react-web-share'
import { Player } from '@lottiefiles/react-lottie-player'
import empty from '../components/Animation/empty.json'
import { useAlertMessage } from 'hooks/use-alert-message'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetMetadataContent, useGetPosts } from 'repositories/rpc.repository'
import { useBoundStore } from 'store'
import { WallAddIcon, WallShareIcon } from 'components/Icons/icons'

const PageWall = () => {
  const { key } = useParams()
  const { data: token } = useGetMetadataContent(
    key as string,
    import.meta.env.VITE_METADATA_META_CONTRACT_ID as string,
    import.meta.env.VITE_METADATA_META_CONTRACT_ID as string,
    'token',
    key as string
  )
  const [socials, setSocials] = useState<any>([])
  const [address, setAddress] = useState<String>('')
  const [id, setTokenId] = useState<String>('')
  const [chain, setChainId] = useState<String>('')

  const navigate = useNavigate()

  const { data } = useGetPosts(key as string)

  const { modal, setModalState } = useBoundStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState('')

  const { showError } = useAlertMessage()
  const { getAccounts } = useWeb3Auth()

  const openNewPostModal = () => {
    if (account) {
      setModalState({ newPost: { isOpen: true } })
    } else {
      showError(`Please login to post content`)
    }
  }

  const closeNewPostModal = () => {
    setModalState({ newPost: { isOpen: false } })
  }

  const openPOAPModal = () => {
    setModalState({ poap: { isOpen: true } })
  }

  const goToComments = (cid: string) => {
    navigate(`/comment/${address}/${id}/${chain}/${cid}`)
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

    if (token) {
      setAddress(token.address as String)
      setChainId(token.chain as String)
      setTokenId(token.id as String)
    }
  }, [getAccounts, token])

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

      {!isLoading && socials.length === 0 && (
        <div className="min-h-screen flex flex-col justify-center gap-2">
          <Player autoplay loop src={empty} className="h-72 m-72" />

          <p className="text-center capitalize font-semibold">No Posts Yet</p>
          <p className="text-center text-slate-500 ">
            No one has posted in this wall. <br />
            Be the first one!
          </p>
        </div>
      )}

      <aside className="fixed bottom-5 right-5 flex flex-col space-y-2 items-end">
        {/* Mint Ownership */}
        {
          <button
            onClick={() => openPOAPModal()}
            className="bg-blue-500 text-white hover:bg-blue-400 h-12 w-12 rounded-full flex items-center justify-center text-sm"
          >
            NFT
          </button>
        }

        <RWebShare
          data={{
            title: 'W3wall',
            url: `${window.location.origin}/wall/${key}`,
            text: 'Check this out',
          }}
          onClick={() => {}}
        >
          <div className="bg-blue-500 text-white hover:bg-blue-400 h-12 w-12 rounded-full flex items-center justify-center text-2xl">
            <WallShareIcon />
          </div>
        </RWebShare>
        <button
          onClick={() => openNewPostModal()}
          className="bg-purple-500 text-white hover:bg-purple-400  h-14 w-14 shadow-mg rounded-full flex items-center justify-center text-2xl"
        >
          <WallAddIcon />
        </button>
      </aside>

      <NewPostModal
        id={key as String}
        tokenId={id}
        tokenAddress={address}
        chainId={chain}
        isOpen={modal.newPost.isOpen}
        onClose={closeNewPostModal}
      />

      <PoapModal tokenId={id as string} isOpen={modal.poap.isOpen} onClose={closePOAPModal} />

      <CommentModal
        tokenAddress={address}
        chainId={chain}
        tokenId={id}
        isOpen={modal.comment.isOpen}
        onClose={closeCommentModal}
      />
    </div>
  )
}

export default PageWall
