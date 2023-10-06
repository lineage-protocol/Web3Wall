import { useBoundStore } from 'store'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useState } from 'react'

interface Prop {
  tokenId: string
  disabled?: boolean
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
    <>
      <button
        onClick={() => onPoap()}
        className="block shrink-0 p-2.5 font-semibold  text-blue-600"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Mint POAP'}
      </button>
    </>
  )
}

export default PoapButton
