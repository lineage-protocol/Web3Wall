import { useBoundStore } from 'store'
import GenericButton from './GenericButton'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useNavigate } from 'react-router-dom'

interface Prop {
  tokenId: string
  disabled?: boolean
}

const PoapButton = (prop: Prop) => {
  const { writeContract } = useWeb3Auth()
  const { setModalState } = useBoundStore()

  const onPoap = async () => {
    try {
      const abi = [
        {
          inputs: [{ internalType: 'uint256', name: 'name', type: 'uint256' }],
          name: 'mintCopy',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ]

      await writeContract({
        abi,
        contractAddress: `${import.meta.env.VITE_WEB3WALL_UTILITY}`,
        data: [prop.name, prop.url],
      })

      setModalState({ mint: { isOpen: false } })
    } catch (e: unknown) {
      console.log('e', e)
    }
  }

  return (
    <>
      <button onClick={() => onPoap()} className="block shrink-0 p-2.5 font-semibold text-blue-600">
        Mint POAP
      </button>
    </>
  )
}

export default PoapButton
