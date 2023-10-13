import { useBoundStore } from 'store'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useState } from 'react'

interface Prop {
  tokenId: string
  disabled?: boolean
  className?: string
}

const PoapButton = (prop: Prop) => {
  const { mintCopy, getAccounts } = useWeb3Auth()
  const { setModalState } = useBoundStore()
  const [isLoading, setIsLoading] = useState(false)

  const onPoap = async () => {
    try {
      const account = await getAccounts()
      if (!account) return
      setIsLoading(true)

      const abi = [
        {
          inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
          name: 'mintCopy',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ]

      await mintCopy({
        abi,
        contractAddress: `${import.meta.env.VITE_WEB3WALL_UTILITY}`,
        data: parseInt(prop.tokenId),
      })

      setModalState({ poap: { isOpen: false } })
      setIsLoading(false)
    } catch (e: unknown) {
      console.log('e', e)
    }
  }

  return (
    <div className="flex items-center text-center justify-center">
      {!isLoading ? (
        <button
          disabled={isLoading}
          className={`w-3/4 group relative inline-block text-sm font-medium text-purple-800 focus:outline-none focus:ring active:text-purple-800 ${
            prop.className ?? ''
          } ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => onPoap()}
        >
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-purple-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="flex items-center relative border border-current bg-purple-200 px-8 py-3 justify-center">
            Mint
          </span>
        </button>
      ) : (
        <span className="text-red-600">Processing...</span>
      )}
    </div>
  )
}

export default PoapButton
