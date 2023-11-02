import ChainToIcon from 'components/ChainToIcon'
import { AtSymbolIcon, AtSymbolSolidIcon, CommentIcon, CommentSolidIcon } from 'components/Icons/icons'
import ImageContainer from 'components/ImageContainer'
import useInViewport from 'hooks/useInViewport'
import { useEffect, useState } from 'react'
import { RWebShare } from 'react-web-share'
import { useGetCommentCount, useGetMentionCount, useGetMentions } from 'repositories/rpc.repository'
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
  if (prop.text && prop.image) {
    return (
      <>
        <div className="px-3 content">{prop.text}</div>
        <div className="mx-auto mt-2">
          <img src={prop.image} className="w-full object-contain" alt="" />
        </div>
      </>
    )
  } else if (prop.image) {
    return (
      <div className="w-full flex justify-around">
        <img src={prop.image} className="object-contain" alt="" />
      </div>
    )
  } else if (prop.text) {
    return <div className="px-3 content">{prop.text}</div>
  } else {
    return <></>
  }
}

const SocialCard = (prop: SocialCardProp) => {
  const [commentCount, setCommentCount] = useState(0)
  const [ref, inViewport] = useInViewport()

  const commentQuery = useGetCommentCount(prop.cid)
  const { data: mentionCount } = useGetMentionCount(prop.cid)
  const { data: mentions } = useGetMentions(prop.cid, mentionCount as number)

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

  const goToScan = (mention: any) => {
    switch (mention.token.chain) {
      case '1':
        window.open(`https://etherscan.com/nft/${mention.token.address}/${mention.token.id}`, '_blank')
        break
    }
  }

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

          {mentions && mentions?.length > 0 && (
            <div className="flex flex-wrap gap-2 ml-3 mt-2">
              {mentions.map((mention, index) => {
                if (!mention.mention.mentionable) return
                return (
                  <div key={index} className="relative">
                    <ImageContainer
                      src={mention.nft.image as string}
                      key={index}
                      onClick={() => goToScan(mention)}
                      classNames="w-32 h-32 grid place-content-center cursor-pointer"
                    />
                    <div className="absolute top-0 left-0 p-2 h-5 w-5">
                      <ChainToIcon chain={mention.token.chain} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className={`flex mx-3 items-center gap-1 py-3 text-gray-500 justify-between`}>
            <div className="flex gap-3">
              <span
                onClick={() => {
                  if (prop?.goToComments) {
                    prop.goToComments?.(prop.cid)
                  }
                }}
                className={`text-sm flex gap-1 items-center ${prop?.goToComments ? 'cursor-pointer' : ''}`}
              >
                {commentCount == 0 && <CommentIcon />}
                {commentCount > 0 && <CommentSolidIcon />}
                <span className="text-xs">{commentCount}</span>
              </span>

              <span className={`text-sm flex gap-1 items-center ${prop?.goToComments ? 'cursor-pointer' : ''}`}>
                {mentionCount > 0 && (
                  <>
                    <AtSymbolSolidIcon />
                  </>
                )}
              </span>
            </div>
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
