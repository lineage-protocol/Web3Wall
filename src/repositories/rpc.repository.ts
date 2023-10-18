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
        await queryClient.invalidateQueries([RQ_KEY.GET_COMMENTS])
        if (timeout) clearTimeout(timeout)
      }, 8000)
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

const useGetPosts = (nft_key: string) => {
  return useQuery({
    queryKey: [RQ_KEY.GET_POSTS],
    queryFn: async () => {
      const result = await rpc.searchMetadatas({
        query: [
          {
            column: 'data_key',
            op: '=',
            query: nft_key,
          },
          {
            column: 'meta_contract_id',
            op: '=',
            query: `${import.meta.env.VITE_WEB3WALL_META_CONTRACT_ID}`,
          },
        ],
      })

      const txs = await rpc.getTransactions({
        query: [
          {
            column: 'data_key',
            op: '=',
            query: nft_key,
          },
          {
            column: 'meta_contract_id',
            op: '=',
            query: `${import.meta.env.VITE_WEB3WALL_META_CONTRACT_ID}`,
          },
        ],
      })

      const reduced = txs.reduce(
        (acc, curr) => {
          acc[curr.version] = curr
          return acc
        },
        {} as Record<string, any>
      )

      const promises = result?.map(async (curr: any) => {
        const res = await rpc.getContentFromIpfs(curr.cid as string)
        const content = JSON.parse(res.data.result.content as string)
        const data = content.content as { text: string; image: string }
        const tx = reduced[curr.version]

        return {
          ...data,
          public_key: curr.public_key,
          timestamp: content.timestamp as number,
          cid: curr.cid,
          token_address: tx?.token_address,
          token_id: curr.token_id,
          chain_id: tx?.chain_id,
          test: curr,
        }
      })

      const results = await Promise.all(promises)

      return results
    },
  })
}

const useGetPost = (cid: string) => {
  return useQuery({
    queryKey: [RQ_KEY.GET_POST, cid],
    queryFn: async () => {
      const result = await rpc.searchMetadatas({
        query: [
          {
            column: 'cid',
            op: '=',
            query: cid,
          },
        ],
      })

      const { version } = result[0]

      const txs = await rpc.getTransactions({
        query: [
          {
            column: 'version',
            op: '=',
            query: version,
          },
        ],
      })

      const curr = result[0]
      const tx = txs[0]

      const res = await rpc.getContentFromIpfs(curr.cid as string)
      const content = JSON.parse(res.data.result.content as string)
      const data = content.content as { text: string; image: string }

      return {
        ...data,
        ...curr,
        ...tx,
      }
    },
  })
}

type Comment = {
  from: string
  message: string
  timestamp: number
}

const useGetComments = (cid: string) => {
  return useQuery({
    queryKey: [RQ_KEY.GET_COMMENTS],
    queryFn: async () => {
      const result = await rpc.searchMetadatas({
        query: [
          {
            column: 'version',
            op: '=',
            query: cid,
          },
          {
            column: 'meta_contract_id',
            op: '=',
            query: `${import.meta.env.VITE_WEB3WALL_COMMENT_META_CONTRACT_ID}`,
          },
          {
            column: 'alias',
            op: '=',
            query: 'comments',
          },
        ],
        ordering: [],
        from: 0,
        to: 0,
      })

      const promises = result?.map(async (curr: any) => {
        const res = await rpc.getContentFromIpfs(curr.cid as string)
        const content = JSON.parse(res.data.result.content as string)
        const data = content.content as Comment[]
        return data
      })

      const results = await Promise.all(promises)
      const flattened = results.flat() as Comment[]
      return flattened.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
    },
  })
}

const useGetCommentCount = (cid: string) => {
  return useQuery({
    queryKey: [RQ_KEY.GET_COMMENT_COUNT, cid],
    queryFn: async () => {
      const result = await rpc.searchMetadataCount({
        query: [
          {
            column: 'version',
            op: '=',
            query: cid,
          },
          {
            column: 'meta_contract_id',
            op: '=',
            query: `${import.meta.env.VITE_WEB3WALL_COMMENT_META_CONTRACT_ID}`,
          },
        ],
      })

      return result
    },
  })
}

export {
  useGetCompleteTransactions,
  useGetTransactions,
  usePublishTransaction,
  useStoreBlob,
  useGetPosts,
  useGetComments,
  useGetCommentCount,
  useGetPost,
}
