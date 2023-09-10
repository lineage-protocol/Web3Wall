import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import rpc, { JSONRPCFilter, NftMetadata, Transaction } from '../services/rpc'
import { useIpfs } from 'hooks/use-ipfs'
import { RQ_KEY } from 'repositories'
import { formatDataKey } from 'utils'

const useGetCompleteTransactions = () => {
  return useQuery({
    queryKey: [RQ_KEY.GET_COMPLETED_TXS],
    queryFn: async () => {
      return await rpc.getCompleteTransactions()
    },
    retry: false,
  })
}

export type DataTypeMetadata = {
  type: 'metadata'
  data: NftMetadata
}

export type DataTypeMedia = {
  type: 'image' | 'audio'
  data: string
}

export type DataTypeNone = {
  type: 'none'
  data: string
}

export async function parseString(input: string): Promise<DataTypeMetadata | DataTypeNone | DataTypeMedia> {
  try {
    const parsed = JSON.parse(input)
    if (typeof parsed === 'object') return { type: 'metadata', data: parsed }
  } catch (e) {}

  try {
    const response = await fetch(input)
    const contentType = response.headers.get('content-type')
    if (contentType?.startsWith('image/')) return { type: 'image', data: input }
    if (contentType?.startsWith('audio/')) return { type: 'audio', data: input }
  } catch (e) {}

  return { type: 'none', data: input }
}

const useGetTransactions = (data: JSONRPCFilter<Transaction> & { address?: `0x${string}` | undefined }) => {
  const { address, ...filter } = data

  return useQuery({
    queryKey: [RQ_KEY.GET_TXS],
    queryFn: async () => {
      return await rpc.getTransactions(filter)
    },
  })
}

const usePublishTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Transaction) => {
      return await rpc.publish(data)
    },
    onSuccess: async () => {
      let timeout: NodeJS.Timeout
      timeout = setTimeout(async () => {
        await queryClient.invalidateQueries([RQ_KEY.GET_POSTS])
        if (timeout) clearTimeout(timeout)
      }, 5000)
    },
  })
}

const useStoreBlob = () => {
  const { ipfs } = useIpfs()

  return useMutation({
    mutationFn: async (blob: Blob) => {
      const resp = await ipfs?.storeBlob(blob)
      const url = `${import.meta.env.VITE_IPFS_NFT_STORAGE_URL}/${resp}`
      return url
    },
  })
}

const useGetPosts = () => {
  return useQuery({
    queryKey: [RQ_KEY.GET_POSTS],
    queryFn: async () => {
      const result = await rpc.getTransactions({
        query: [
          {
            column: 'method',
            op: '=',
            query: 'metadata',
          },
          {
            column: 'status',
            op: '=',
            query: '1',
          },
          {
            column: 'meta_contract_id',
            op: '=',
            query: `${import.meta.env.VITE_WEB3WALL_META_CONTRACT_ID}`,
          },
        ],
        ordering: [
          {
            column: 'timestamp',
            sort: 'desc',
          },
        ],
        from: 0,
        to: 0,
      })

      return result?.reduce(
        (prev, curr) => {
          const data_key = formatDataKey(curr.chain_id, curr.token_address, curr.token_id)

          if (!prev[data_key]) prev[data_key] = []

          try {
            const data = JSON.parse(curr.data) as { text: string; image: string }

            prev[data_key]?.push({
              ...data,
              public_key: curr.public_key,
              timestamp: curr.timestamp as number,
            })

            return prev
          } catch (e) {
            return prev
          }
        },
        {} as Record<string, { public_key: string; text: string; image: string; timestamp: number }[]>
      )
    },
  })
}

export { useGetCompleteTransactions, useGetTransactions, usePublishTransaction, useStoreBlob, useGetPosts }
