import { CloseIcon, CommentIcon, CommentSolidIcon } from 'components/Icons/icons'
import useInViewport from 'hooks/useInViewport'
import { useEffect, useState } from 'react'
import { RWebShare } from 'react-web-share'
import { useGetCommentCount } from 'repositories/rpc.repository'
import { timeAgo } from 'utils'

interface SocialCardProp {
  token_id: string
  token_address: string
  chain_id: string
  text?: string
  image?: string
  public_key: string
  timestamp: number
  cid: string
  showNoOfComments: boolean
  noOfComments?: number
  goToComments?: (cid: string) => void
}


const SortCardDisplay = (prop: SocialCardProp) => {
  const textWithClickableLink = (text: string) => {
    if (!text) {
      return ''
    }

    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%=~_|$?!:,.]*[A-Z0-9+&@#/%=~_|$])/gi
    const textWithLinks = text.replace(
      urlRegex,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline text-indigo-500">$1</a>'
    )
    return textWithLinks
  }
  const linkValidation = textWithClickableLink(prop.text as string)

  const handleLinkClick =(e: any) => {
    if (e.target instanceof HTMLAnchorElement) {
      e.stopPropagation()
    }
  }
  if (prop.text && prop.image) {
    return (
      <>
        <div onClick={handleLinkClick}>
          <p dangerouslySetInnerHTML={{ __html: linkValidation }} className="px-3 pb-2 text-sm content" />
        </div>
        <div className="mx-auto mt-2">
          <img src={prop.image} className="w-full h-auto object-contain" alt="" />
        </div>
      </>
    )
  } else if (prop.image) {
    return (
      <div className="w-full flex justify-around">
        <img src={prop.image} className="w-full h-auto object-contain" alt="" />
      </div>
    )
  } else if (prop.text) {
    return (
      <div onClick={handleLinkClick}>
        <p dangerouslySetInnerHTML={{ __html: linkValidation }} className="px-3 pb-2 text-sm content" />
      </div>
    )
  } else {
    return <></>
  }
}

const SocialCard = (prop: SocialCardProp) => {
  const [commentCount, setCommentCount] = useState(0)
  const [ref, inViewport] = useInViewport()
  const [isClick, setIsClick] = useState(false)

  const commentQuery = useGetCommentCount(prop.cid)

  useEffect(() => {
    if (prop?.showNoOfComments && prop.noOfComments !== undefined) {
      setCommentCount(prop.noOfComments)
    }
  }, [])

  useEffect(() => {
    if (inViewport && prop.noOfComments === undefined) {
      if (!commentQuery.isLoading && !commentQuery.isError) {
        setCommentCount(commentQuery.data as number)
      } else {
        commentQuery.refetch().catch(e => console.log(e))
      }
    }
  }, [commentQuery, inViewport, prop.noOfComments])

  return (
    <>
      <article className="transition" ref={ref as React.RefObject<HTMLDivElement>}>
        <div className="bg-white border-b-[1px] mb-1 border-gray-200 mx-1">
          <div className="flex px-3 pt-3 mb-1 text-xs">
            <div className="font-bold">
              {prop.public_key?.substring(0, 6) + '...' + prop.public_key?.substring(prop.public_key.length - 4)}
            </div>
            <div className="ml-2 text-gray-400">{timeAgo(prop.timestamp)}</div>
          </div>

          <div
            onClick={() => {
              if (prop?.goToComments) {
                prop.goToComments?.(prop.cid)
              }
            }}
            className={prop?.goToComments ? 'cursor-pointer' : ''}
          >
            <SortCardDisplay {...prop} />
          </div>

          <div className={`flex mx-3 items-center gap-1 py-3 text-gray-500 justify-between`}>
            <span
              onClick={() => {
                if (prop?.goToComments && isClick === false) {
                  prop.goToComments?.(prop.cid)
                }
              }}
              className={`text-sm flex gap-1 items-center ${prop?.goToComments ? 'cursor-pointer' : ''}`}
            >
              {commentCount == 0 && <CommentIcon />}
              {commentCount > 0 && <CommentSolidIcon />}
              <span className="text-xs">{commentCount}</span>
            </span>
            <RWebShare
              data={{
                title: 'W3wall',
                url: `${window.location.origin}/comment/${prop.token_address}/${prop.token_id}/${prop.chain_id}/${prop.cid}/`,
                text: 'Check this out',
              }}
              onClick={() => {}}
            >
              <div className="text-sm flex gap-2 items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>

                <div>Share</div>
              </div>
            </RWebShare>
          </div>
        </div>
      </article>
    </>
  )
}

export default SocialCard
