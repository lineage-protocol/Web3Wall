import { StateCreator } from 'zustand'
import { resetters } from '..'

export type ModalState = {
  isOpen: boolean
  isSkipped?: boolean
}

export type TokenState = {
  tokenId: String
  tokenAddress: String
  chainId: String
}

export type Modal = {
  signUpMain: ModalState
  signUpRainbow: ModalState
  mint: ModalState
  poap: ModalState
  comment: ModalState & TokenState & { postCid: string }
  proof: ModalState & { tokenId: string }
  mention: ModalState
}

export interface ModalSlice {
  modal: Modal
  setModalState: (modal: Partial<Modal>) => void
  resetModal: () => void
}

const initialModal = {
  modal: {
    signUpMain: { isOpen: false },
    signUpRainbow: { isOpen: false },
    mint: { isOpen: false },
    poap: { isOpen: false },
    comment: { isOpen: false, tokenId: '', tokenAddress: '', chainId: '', postCid: '' },
    proof: { isOpen: false, tokenId: '' },
    mention: { isOpen: false },
  },
}

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = set => {
  resetters.push(() => set(initialModal))

  return {
    ...initialModal,
    setModalState: (modal: Partial<Modal>) => {
      set(state => ({
        modal: Object.assign(state.modal, modal),
      }))
    },
    resetModal: () => {
      set({ ...initialModal })
    },
  }
}
