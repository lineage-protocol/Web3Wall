import adapter from 'adapter/moralis'

export const getNftsCollection = (address: string, chain: any) => {
  return adapter({
    method: 'GET',
    url: `/nft/${address}?chain=${chain}`,
  })
}

export const getNFTMetadata = (address: string, chain: any, tokenId: string) => {
  return adapter({
    method: 'GET',
    url: `/nft/${address}/${tokenId}?chain=${chain}`,
  })
}