import { useBoundStore } from 'store'
import { useWeb3Auth } from 'hooks/use-web3auth'
import { AbiCoder } from 'ethers'
import { useAlertMessage } from 'hooks/use-alert-message'
import { useState } from 'react'

interface Prop {
  name: string
  url: string
  body: string
  disabled?: boolean
  setIsLoading: (bool: boolean) => void
  resetMint: () => void
}

const MintButton = (prop: Prop) => {
  const { callContractMethod, getAccounts } = useWeb3Auth()
  const { showError, showSuccess } = useAlertMessage()
  const { setModalState } = useBoundStore()

  const [isDisabled, setIsDisable] = useState(true)

  const onMint = async () => {
    try {
      const account = await getAccounts()
      if (!account) {
        setIsDisable(true)
        return
      }

      setIsDisable(false)
      prop.setIsLoading(true)

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

      const abiCoder = new AbiCoder()
      const encoded = abiCoder.encode(['string', 'string', 'string'], [prop.name, prop.url, prop.body])
      await callContractMethod({
        contractABI,
        contractAddress: `${import.meta.env.VITE_WEB3WALL_UTILITY}`,
        data: [encoded],
        method: contractABI[0].name,
        options: {
          value: '0.015',
        },
      })

      showSuccess(`Creating topic in progress, you'll see it in list once completed.`)
      setModalState({ mint: { isOpen: false } })
      prop.setIsLoading(false)
      prop.resetMint()
    } catch (e: any) {
      console.log(e)
      let msg = `Oops! We couldn't create your new topic. Please try again.`
      if (e.reason) {
        msg += `(${e.reason})`
      }

      showError(msg)

      prop.setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => onMint()}
        className={`block shrink-0 p-2.5 font-semibold ${
          isDisabled && prop.disabled ? 'text-gray-400' : 'text-blue-600'
        }`}
        disabled={isDisabled && prop.disabled}
      >
        Create
      </button>
    </>
  )
}

export default MintButton
