import ResponsiveText from 'components/ResponsiveText'

interface SocialCardProp {
  text: String
  image: String
  public_key: String
}

const SortCardDisplay = (prop: SocialCardProp) => {
  if (prop.image) {
    return <div className='px-3'><img src={prop.image as string} alt="" /></div>
  } else if (prop.text) {
    return <ResponsiveText>{prop.text}</ResponsiveText>
  } else {
    return <></>
  }
}

const SocialCard = (prop: SocialCardProp) => {
  return (
    <>
      <article className="transition">
        <div className="bg-white pb-5 border-[1px] border-black mx-2 mt-2 rounded-md">
          <div className="px-3 pt-5 mb-2 text-xs">
            <div className="font-bold">{prop.public_key}</div>
            <div className="text-gray-400">1 day</div>
          </div>

          <div>
            <SortCardDisplay {...prop} />
          </div>

          <div className="flex justify-end mx-3 pt-2 items-center gap-1 text-gray-500">
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
      </article>
    </>
  )
}

export default SocialCard
