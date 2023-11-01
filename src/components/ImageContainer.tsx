interface Prop {
  src: String
  classNames: string
  onClick?: () => void
}

const ImageContainer = (prop: Prop) => {
  const displayImageURL = (url: string) => {
    if (url && url.startsWith('ipfs://')) {
      return url.replace('ipfs://', import.meta.env.VITE_IPFS_GATEWAY_URL as string)
    }

    return url
  }

  return (
    <>
      <img
        src={displayImageURL(prop.src as string)}
        onClick={prop.onClick}
        className={`rounded-md  ${prop.classNames}`}
      />
    </>
  )
}

export default ImageContainer
