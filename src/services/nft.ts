import Moralis from 'moralis'

export const getNftsCollection = (address: string, chain: any) =>
  Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
  })
