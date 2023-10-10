import Moralis from 'moralis'

export const getNftsCollection = (address: string, chain: string) => {
  return Moralis.EvmApi.nft.getWalletNFTCollections({
    address,
    chain,
  })
}
