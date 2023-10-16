import { useQuery } from '@tanstack/react-query'
import { RQ_KEY } from './'
import { ApolloClientFilter, apolloQuery } from 'services/apollo'
import { decodeMinted } from 'utils/subgraph.util'
import { formatDataKey } from 'utils'

type MintedEvent = {
  tokenId: string
  id: string
  data: any
  transactionHash: string
  blockTimestamp: string
}

const useGetEvents = (variables: ApolloClientFilter) => {
  const query = `
  query Minteds($first: Int, $skip: Int, $where: Minted_filter, $orderDirection: OrderDirection) {
    minteds(first: $first, skip: $skip, where: $where, orderBy: blockTimestamp, orderDirection: $orderDirection) {
      tokenId
      id
      data
      transactionHash
      blockTimestamp
    }
  }
  `
  return useQuery({
    queryKey: [RQ_KEY.GET_SHEETS],
    queryFn: async () => {
      const { data } = await apolloQuery<{ minteds: MintedEvent[] }>({ query, variables })

      return data.minteds?.map(el => {
        const [name, image, body] = decodeMinted(el.data)
        return {
          ...el,
          data: { name, image, body },
          data_key: formatDataKey(
            `${import.meta.env.VITE_DEFAULT_CHAIN_ID}`,
            `${import.meta.env.VITE_WEB3WALL_NFT}`.toLowerCase(),
            `${el.tokenId}`
          ),
        }
      })
    },
  })
}

export { useGetEvents }
