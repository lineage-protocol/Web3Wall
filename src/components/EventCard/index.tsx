import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RWebShare } from 'react-web-share'
import { formatDataKey } from 'utils'

interface VersionCardProp {
  title: String
  content: String
  imageUrl?: String
  chainId: String
  tokenAddress: String
  tokenId: String
  totalUser: number
  totalPost: number
  onHandleShareClicked: (chainId: String, tokenAddress: String, tokenId: String, version: String) => void
  onProofClicked: () => void
}

const EventCard = (prop: VersionCardProp) => {
  const navigate = useNavigate()

  const [nftKey, setNftKey] = useState('')

  useEffect(() => {
    const key = formatDataKey(prop.chainId, prop.tokenAddress, prop.tokenId)
    setNftKey(key)
  }, [prop.chainId, prop.tokenAddress, prop.tokenId])

  const goToWall = (id: String) => {
    navigate(`/wall/${prop.tokenAddress}/${prop.tokenId}/${prop.chainId}/${id}`)
  }

  return (
    <>
      <div className="overflow-hidden shadow border-black transition">
        <div className="h-full transform items-end bg-white transition-transform">
          <div className="bg-white">
            {prop.imageUrl && (
              <img
                src={prop.imageUrl as string}
                className="w-full object-scale-down h-52 p-2 cursor-pointer"
                onClick={() => goToWall(nftKey)}
              />
            )}
            <div className="p-2 w-full cursor-pointer" onClick={() => goToWall(nftKey)}>
              <div className="flex items-center">
                <h3 className="grow font-medium text-ellipsis">{prop.title}</h3>
              </div>
              <div className="items-center gap-2 text-xs text-gray-500">
                <div className="text-xs">{prop.content}</div>
              </div>
            </div>

            <div className={`flex mx-2 items-center gap-1 py-1 text-gray-500 justify-between text-sm`}>
              <button className="p-0" onClick={prop.onProofClicked}>
                Proof
              </button>
              <RWebShare
                data={{
                  title: 'W3wall',
                  url: `${window.location.origin}/wall/${prop.tokenAddress}/${prop.tokenId}/${prop.chainId}/${nftKey}/`,
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
        </div>
      </div>
    </>
  )
}

export default EventCard
