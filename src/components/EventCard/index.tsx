import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDataKey } from 'utils'

interface VersionCardProp {
  title: String
  imageUrl?: String
  chainId: String
  tokenAddress: String
  tokenId: String
  totalUser: number
  totalPost: number
  onHandleShareClicked: (chainId: String, tokenAddress: String, tokenId: String, version: String) => void
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
      <div className="overflow-hidden shadow border-black transition" onClick={() => goToWall(nftKey)}>
        <div className="h-full transform items-end border-2 border-black bg-white transition-transform">
          {prop.imageUrl && <img src={prop.imageUrl as string} className="h-32 w-full object-cover" />}
          <div className="bg-[#F5F5F5] p-3 w-full">
            <div className="flex items-center">
              <h3 className="grow text-2xl font-medium text-ellipsis">{prop.title}</h3>
              <div className="flex-none">
                <span role="img" aria-label="Polygon Logo" className="icon-32">
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
                    <path
                      fill="#8247E5"
                      d="M11.3944 10.7329L14.7152 8.81544C14.8912 8.71358 15 8.52468 15 8.32196V4.48698C15 4.28426 14.8912 4.09538 14.7152 3.99351L11.3944 2.07602C11.2184 1.97417 10.9999 1.97516 10.8248 2.07602L7.50404 3.99351C7.32805 4.09538 7.21925 4.28426 7.21925 4.48698V11.3401L4.89037 12.684L2.56149 11.3401V8.6513L4.89037 7.30737L6.42617 8.19438V6.39062L5.17515 5.66774C5.08911 5.61829 4.99027 5.59159 4.89037 5.59159C4.79046 5.59159 4.69162 5.61829 4.60558 5.66774L1.28481 7.58523C1.10878 7.68709 1 7.876 1 8.07871V11.9137C1 12.1164 1.10878 12.3053 1.28481 12.4071L4.60558 14.3247C4.78157 14.4255 4.99916 14.4255 5.17515 14.3247L8.49593 12.4071C8.67198 12.3053 8.78071 12.1164 8.78071 11.9137V5.05956L8.82225 5.03582L11.1086 3.71563L13.4375 5.05956V7.74842L11.1086 9.09235L9.57481 8.20724V10.0111L10.8238 10.732C10.9999 10.8328 11.2184 10.8328 11.3934 10.732L11.3944 10.7329Z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="items-center gap-2 text-xs text-gray-500">
              <div className="text-xs">{prop.tokenAddress}</div>
              <div>Token ID: {prop.tokenId}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventCard
