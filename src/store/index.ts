import { create } from 'zustand'
import { ModalSlice, createModalSlice } from './slices/modal.slice'
import { WalletSlice, createWalletSlice } from './slices/wallet.slice'
import { WallSlice, createWallSlice } from './slices/wall.slice'

type ResetAllSlices = { resetAllSlices: () => void }
type BoundStoreType = ModalSlice & ResetAllSlices & WalletSlice & WallSlice

export const resetters: (() => void)[] = []

export const useBoundStore = create<BoundStoreType>()((...a) => ({
  ...createModalSlice(...a),
  ...createWalletSlice(...a),
  ...createWallSlice(...a),
  resetAllSlices: () => resetters.forEach(resetter => resetter()),
}))
