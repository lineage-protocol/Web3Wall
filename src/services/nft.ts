import instance from 'adapter/moralis'

export const getNftsCollection = (address: string, chain: string) => {
  return instance({
    method: 'GET',
    url: `/${address}/nft?chain=${chain}&format=decimal&media_items=false`,
  })
}
