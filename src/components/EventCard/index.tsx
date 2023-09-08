import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDataKey } from 'utils'

interface VersionCardProp {
  title: String
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
    navigate(`/wall/${id}`)
  }

  return (
    <>
      <article
        className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        onClick={() => goToWall(nftKey)}
      >
        <div className="bg-white p-4 sm:p-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span role="img" aria-label="Polygon Logo" className="icon-32">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
                <path
                  fill="#8247E5"
                  d="M11.3944 10.7329L14.7152 8.81544C14.8912 8.71358 15 8.52468 15 8.32196V4.48698C15 4.28426 14.8912 4.09538 14.7152 3.99351L11.3944 2.07602C11.2184 1.97417 10.9999 1.97516 10.8248 2.07602L7.50404 3.99351C7.32805 4.09538 7.21925 4.28426 7.21925 4.48698V11.3401L4.89037 12.684L2.56149 11.3401V8.6513L4.89037 7.30737L6.42617 8.19438V6.39062L5.17515 5.66774C5.08911 5.61829 4.99027 5.59159 4.89037 5.59159C4.79046 5.59159 4.69162 5.61829 4.60558 5.66774L1.28481 7.58523C1.10878 7.68709 1 7.876 1 8.07871V11.9137C1 12.1164 1.10878 12.3053 1.28481 12.4071L4.60558 14.3247C4.78157 14.4255 4.99916 14.4255 5.17515 14.3247L8.49593 12.4071C8.67198 12.3053 8.78071 12.1164 8.78071 11.9137V5.05956L8.82225 5.03582L11.1086 3.71563L13.4375 5.05956V7.74842L11.1086 9.09235L9.57481 8.20724V10.0111L10.8238 10.732C10.9999 10.8328 11.2184 10.8328 11.3934 10.732L11.3944 10.7329Z"
                ></path>
              </svg>
            </span>{' '}
            {prop.tokenAddress} &middot; {prop.tokenId}
          </div>

          <h3 className="my-2 text-xl font-semibold text-gray-900">{prop.title}</h3>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>

              <p className="text-xs">{prop.totalPost}</p>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>

              <p className="text-xs">{prop.totalUser}</p>
            </div>

            <div className="flex items-center gap-1 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default EventCard
