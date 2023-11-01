import { Nft } from 'lib'
import { getNFTMetadata } from 'services/nft'

const getMoralisNftMetadata = async (chainId: string, tokenAddress: string, tokenId: string) => {
  const response = await getNFTMetadata(tokenAddress, chainId, tokenId)

  const nft: Nft = response.data
  nft.metaObject = JSON.parse(nft.metadata as string)
  const imageURL = (nft.metaObject as any).image
  if (imageURL && imageURL.startsWith('ipfs://')) {
    nft.imageUrl = imageURL.replace('ipfs://', import.meta.env.VITE_IPFS_GATEWAY_URL)
  }

  return nft
}

export { getMoralisNftMetadata }
