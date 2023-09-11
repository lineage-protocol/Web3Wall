import { StateCreator } from 'zustand'
import { resetters } from '..'

export type WallState = {
  shareURL: string | undefined
}

export interface WallSlice {
  wall: WallState
  setWallState: (wall: Partial<WallState>) => void
  resetWall: () => void
}

const initialWall = {
  wall: {
    shareURL: undefined,
  },
}

export const createWallSlice: StateCreator<WallSlice, [], [], WallSlice> = set => {
  resetters.push(() => set(initialWall))

  return {
    ...initialWall,
    setWallState: (wall: Partial<WallState>) => {
      set(state => ({
        wall: Object.assign(state.wall, wall),
      }))
    },
    resetWall: () => {
      set({ ...initialWall })
    },
  }
}
