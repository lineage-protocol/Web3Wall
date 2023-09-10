import GenericButton from './GenericButton'
import { useWeb3Auth } from 'hooks/use-web3auth'

interface Prop {
  name: string
  url: string
  disabled?: boolean
}

const MintButton = (prop: Prop) => {
  const { writeContract } = useWeb3Auth()

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

      await writeContract({
        abi,
        contractAddress: `${import.meta.env.VITE_WEB3WALL_UTILITY}`,
        data: [prop.name, prop.url],
      })
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
