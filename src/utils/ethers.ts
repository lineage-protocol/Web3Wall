/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SafeEventEmitterProvider } from '@web3auth/base'
import { ethers } from 'ethers'

export type CallContractMethodArgs = {
  contractABI: any[]
  contractAddress: string
  data: string[]
  method: string
  options?: {
    value: string
  }
}

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider
  }

  async getChainId(): Promise<any> {
    try {
      // For ethers v5
      // const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const ethersProvider = new ethers.BrowserProvider(this.provider)
      // Get the connected Chain's ID
      const networkDetails = await ethersProvider.getNetwork()
      return networkDetails.chainId
    } catch (error) {
      return error
    }
  }

  async getAccounts(): Promise<any> {
    const ethersProvider = new ethers.BrowserProvider(this.provider)
    const signer = await ethersProvider.getSigner()
    const address = signer.getAddress()

    return address
  }

  async getBalance(): Promise<string> {
    try {
      // For ethers v5
      // const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const ethersProvider = new ethers.BrowserProvider(this.provider)

      // For ethers v5
      // const signer = ethersProvider.getSigner();
      const signer = await ethersProvider.getSigner()

      // Get user's Ethereum public address
      const address = signer.getAddress()

      const balance = ethers.formatEther(
        await ethersProvider.getBalance(address) // Balance is in wei
      )

      return balance
    } catch (error) {
      return error as string
    }
  }

  async mint(contractABI: string, contractAddress: string, data: string[]): Promise<any> {
    try {
      const ethersProvider = new ethers.BrowserProvider(this.provider)
      const signer = await ethersProvider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      // Submit transaction to the blockchain
      const tx = await contract.mint(data[0], data[1])

      // Wait for transaction to be mined
      const receipt = await tx.wait()

      return receipt
    } catch (error) {
      return error as string
    }
  }

  async mintCopy(contractABI: string, contractAddress: string, data: number): Promise<any> {
    try {
      const ethersProvider = new ethers.BrowserProvider(this.provider)
      const signer = await ethersProvider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      // Submit transaction to the blockchain
      const tx = await contract.mintCopy(data)

      // Wait for transaction to be mined
      const receipt = await tx.wait()

      return receipt
    } catch (error) {
      return error as string
    }
  }

  async callContractMethod({
    contractABI,
    contractAddress,
    data,
    method,
    options,
  }: CallContractMethodArgs): Promise<any> {
    const ethersProvider = new ethers.BrowserProvider(this.provider)
    const signer = await ethersProvider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    // Submit transaction to the blockchain
    const tx = await contract[method](...data, options)

    // Wait for transaction to be mined
    const receipt = await tx.wait()

    return receipt
  }

  async signMessage(message: string) {
    try {
      const ethersProvider = new ethers.BrowserProvider(this.provider)
      const signer = await ethersProvider.getSigner()
      // Sign the message
      const signedMessage = await signer.signMessage(message)

      return signedMessage
    } catch (error) {
      return error as string
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: 'eth_private_key',
      })

      return privateKey
    } catch (error) {
      return error as string
    }
  }
}
