import { RWebShare } from 'react-web-share'
import { timeAgo } from 'utils'

interface SocialCardProp {
  tokenId: String
  tokenAddress: String
  chainId: String
  text: String
  image: String
  public_key: String
  timestamp: number
  cid: string
  goToComments?: (cid: string, post: any) => void
}

const SortCardDisplay = (prop: SocialCardProp) => {
  if (prop.text && prop.image) {
    return (
      <>
        <div className="px-3">{prop.text}</div>
        <div className="mx-auto mt-2">
          <img src={prop.image as string} className="w-full object-contain" alt="" />
        </div>
      </>
    )
  } else if (prop.image) {
    return (
      <div className="w-full flex justify-around">
        <img src={prop.image as string} className="object-contain" alt="" />
      </div>
    )
  } else if (prop.text) {
    return <div className="px-3">{prop.text}</div>
  } else {
    return <></>
  }
}

const SocialCard = (prop: SocialCardProp) => {
  return (
    <>
      <article className="transition">
        <div className="bg-white border-b-[1px] mb-1 border-gray-200 mx-1">
          <div className="flex px-3 pt-3 mb-1 text-xs">
            <div className="font-bold">
              {prop.public_key.substring(0, 6) + '...' + prop.public_key.substring(prop.public_key.length - 4)}
            </div>
            <div className="ml-2 text-gray-400">{timeAgo(prop.timestamp)}</div>
          </div>

          <div>
            <SortCardDisplay {...prop} />
          </div>

          <div
            className={`flex mx-3 items-center gap-1 py-3 text-gray-500 ${
              prop?.goToComments ? 'justify-between' : 'justify-end'
            }`}
          >
            {prop?.goToComments && (
              <button
                className="text-sm flex gap-2 items-center cursor-pointer"
                onClick={() => prop.goToComments?.(prop.cid, prop)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </button>
            )}
            <RWebShare
              data={{
                title: 'W3wall',
                url: `${window.location.href}`,
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
