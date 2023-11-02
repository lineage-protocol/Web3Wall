import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import rpc, { JSONRPCFilter, NftMetadata, Transaction } from '../services/rpc'
import { useIpfs } from 'hooks/use-ipfs'
import { RQ_KEY } from 'repositories'
import { Nft } from 'lib'
import { getMoralisNftMetadata } from './moralis.repository'
import { getNFTMetadata } from 'services/nft'
import { chainIdToNetwork } from 'utils'

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
  } catch (e) {
    /* empty */
  }

  try {
    const response = await fetch(input)
    const contentType = response.headers.get('content-type')
    if (contentType?.startsWith('image/')) return { type: 'image', data: input }
    if (contentType?.startsWith('audio/')) return { type: 'audio', data: input }
  } catch (e) {
    /* empty */
  }

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
      }, 10000)
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

const useGetMetadataContent = (
  data_key: string,
  meta_contract_id: string,
  public_key: string,
  alias: string,
  version: string
) => {
  return useQuery({
    queryKey: [RQ_KEY.GET_METADATA, data_key, meta_contract_id, public_key, alias, version],
    queryFn: async () => {
      const result = await rpc.getMetadata(data_key, meta_contract_id, public_key, alias, version)
      if (result.cid) {
        const res = await rpc.getContentFromIpfs(result.cid)
        const content = JSON.parse(res.data.result.content as string)
        return content.content
      }

      return {}
    },
    staleTime: Infinity,
  })
}

const useGetMetadata = (
  data_key: string,
  meta_contract_id: string,
  public_key: string,
  alias: string,
  version: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: [RQ_KEY.GET_METADATA, data_key, meta_contract_id, public_key, alias, version],
    queryFn: async () => {
      const result = await rpc.getMetadata(data_key, meta_contract_id, public_key, alias, version)
      return result
    },
    staleTime: Infinity,
    enabled: enabled,
  })
}

export type Mention = {
  mentionable: boolean
  timestamp: number
}

const useGetMentions = (cid: string, count: number) => {
  return useQuery<any[]>({
    queryKey: [RQ_KEY.GET_MENTIONS, cid],
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
            query: `${import.meta.env.VITE_MENTION_META_CONTRACT_ID}`,
          },
          {
            column: 'alias',
            op: '=',
            query: 'mentions',
          },
        ],
        ordering: [],
        from: 0,
        to: 0,
      })

      const promises = result?.map(async (curr: any) => {
        const resMentionContent = await rpc.getContentFromIpfs(curr.cid as string)
        const mention = JSON.parse(resMentionContent.data.result.content as string)

        const resToken = await rpc.getMetadata(
          curr.data_key as string,
          import.meta.env.VITE_MENTION_META_CONTRACT_ID as string,
          import.meta.env.VITE_METADATA_META_CONTRACT_ID as string,
          'token',
          ''
        )

        if (!resToken.cid) {
          return {}
        }
        const resTokenContent = await rpc.getContentFromIpfs(resToken.cid)
        const token = JSON.parse(resTokenContent.data.result.content as string)

        const resNft = await getNFTMetadata(
          token.content.address as string,
          chainIdToNetwork(token.content.chain as string),
          token.content.id as string
        )

        return { mention: mention.content, nft: JSON.parse(resNft.data.metadata as string), token: token.content }
      })

      const results = await Promise.all(promises)
      const flattened = results.flat()
      return flattened.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
    },
    enabled: count > 0,
  })
}

const useGetMentionCount = (cid: string) => {
  return useQuery({
    queryKey: [RQ_KEY.GET_MENTION_COUNT, cid],
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
            query: `${import.meta.env.VITE_MENTION_META_CONTRACT_ID}`,
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
  useGetMetadata,
  useGetMetadataContent,
  useGetMentions,
  useGetMentionCount,
}
