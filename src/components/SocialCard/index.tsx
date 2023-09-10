import ResponsiveText from 'components/ResponsiveText'

interface SocialCardProp {
  text: String
  image: String
  public_key: String
  timestamp: number
}

const SortCardDisplay = (prop: SocialCardProp) => {
  if (prop.text && prop.image) {
    return (
      <>
        <ResponsiveText>{prop.text}</ResponsiveText>
        <div className="max-w-[300px] mx-auto">
          <img src={prop.image as string} className="object-contain" alt="" />
        </div>
      </>
    )
  } else if (prop.image) {
    return (
      <div className="max-w-[300px] flex justify-around">
        <img src={prop.image as string} className="object-contain" alt="" />
      </div>
    )
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
        <div className="bg-white pb-5">
          <div className="px-5 pt-5 mb-2 text-xs">
            <div className="font-bold">{prop.public_key}</div>
            <div className="text-gray-400">1 day</div>
          </div>

          <div className="">
            <SortCardDisplay {...prop} />
          </div>
        </div>
      </article>
    </>
  )
}

export default SocialCard
