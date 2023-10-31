import adapter from 'adapter/moralis'

export const getNftsCollection = (address: string, chain: any) => {
  return adapter({
    method: 'GET',
    url: `/nft/${address}?chain=${chain}`,
  })
}

export const getNFTMetadata = (address: string, chain: any, tokenId: string) => {
  const url = chain ? `/nft/${address}/${tokenId}?chain=${chain}` : `/nft/${address}/${tokenId}`
  return adapter({
    method: 'GET',
    url,
  })
}
