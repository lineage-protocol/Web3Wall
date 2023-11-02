import { timeAgo } from 'utils'

interface CommentCardProp {
  message: string
  from: string
  timestamp: number
}

const SortCardDisplay = (prop: CommentCardProp) => {
  if (prop.message) {
    return <p className="px-3 pb-2 text-sm content">{prop.message}</p>
  } else {
    return <></>
  }
}

const CommentCard = (prop: CommentCardProp) => {
  return (
    <>
      <article className="max-w-md break-words">
        <div className="bg-white border-b-[1px] mb-1 border-gray-200 mx-1">
          <div className="flex px-3 pt-2 mb-1 text-xs">
            <div className="font-bold">
              {prop.from.substring(0, 6) + '...' + prop.from.substring(prop.from.length - 4)}
            </div>
            <div className="ml-2 text-gray-400">{timeAgo(prop.timestamp)}</div>
          </div>

          <div>
            <SortCardDisplay {...prop} />
          </div>
        </div>
      </article>
    </>
  )
}

export default CommentCard
