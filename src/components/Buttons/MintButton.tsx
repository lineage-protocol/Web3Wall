import { useBoundStore } from 'store'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { AbiCoder } from 'ethers'

interface Prop {
  name: string
  url: string
  body: string
  disabled?: boolean
  setIsLoading: (bool: boolean) => void
  resetMint: () => void
}

const MintButton = (prop: Prop) => {
  const { callContractMethod } = useWeb3Auth()
  const { setModalState } = useBoundStore()

  const abiCoder = new AbiCoder()
  const encoded = abiCoder.encode(['string', 'string', 'string'], [prop.name, prop.url, prop.body])
  const onMint = async () => {
    prop.setIsLoading(true)
    try {
      const contractABI = [
        {
          inputs: [
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'mint',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ]

      await callContractMethod({
        contractABI,
        contractAddress: `${import.meta.env.VITE_WEB3WALL_UTILITY}`,
        data: [encoded],
        method: contractABI[0].name,
        options: {
          value: '0.015',
        },
      })

      setModalState({ mint: { isOpen: false } })
      prop.setIsLoading(false)
      prop.resetMint()
    } catch (e: unknown) {
      console.log('e', e)
    }
  }

  return (
    <>
      <button
        onClick={() => onMint()}
        className="block shrink-0 p-2.5 font-semibold text-blue-600"
        disabled={prop.disabled}
      >
        Create
      </button>
    </>
  )
}

export default MintButton
