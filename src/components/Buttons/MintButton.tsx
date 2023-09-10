import { useBoundStore } from 'store'
import GenericButton from './GenericButton'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { useNavigate } from 'react-router-dom'

interface Prop {
  name: string
  url: string
  disabled?: boolean
}

const MintButton = (prop: Prop) => {
  const navigate = useNavigate()
  const { writeContract } = useWeb3Auth()
  const { setModalState } = useBoundStore()

  // TODO: try wagmi web3auth if current method doesn't work
  /*   const { config } = usePrepareContractWrite({
    address: String(import.meta.env.VITE_WEB3WALL_UTILITY) as `0x${string}`,
    abi: [
      {
        inputs: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'image', type: 'string' },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    functionName: 'mint',
    args: [prop.name, prop.url],
    value: parseEther('0.015'),
    onError(error) {
      console.log('Error', error)
    },
  })

  const { writeAsync, data } = useContractWrite(config)

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      console.log('inside success', data)
    },
  }) */

  const onMint = async () => {
    try {
      const abi = [
        {
          inputs: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'image', type: 'string' },
          ],
          name: 'mint',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ]

      let hash = await writeContract({
        abi,
        contractAddress: `${import.meta.env.VITE_WEB3WALL_UTILITY}`,
        data: [prop.name, prop.url],
      })

      if (hash) {
        setModalState({ mint: { isOpen: false } })
      }
    } catch (e: unknown) {
      console.log('e', e)
    }
  }

  return (
    <>
      <button onClick={() => onMint()} className="block shrink-0 p-2.5 font-semibold text-blue-600">
        Create
      </button>
    </>
  )
}

export default MintButton
