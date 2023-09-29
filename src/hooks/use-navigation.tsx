import React, { createContext, useContext, useState, ReactNode } from 'react'

type NavigationContextType = {
  historyStack: string[]
  pushToStack: (path: string) => void
  popFromStack: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

type NavigationProviderProps = {
  children: ReactNode
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [historyStack, setHistoryStack] = useState<string[]>([])

  const pushToStack = (path: string) => {
    setHistoryStack(prevStack => [...prevStack, path])
  }

  const popFromStack = () => {
    setHistoryStack(prevStack => {
      if (prevStack.length <= 1) return prevStack
      return prevStack.slice(0, -1)
    })
  }

  return (
    <NavigationContext.Provider value={{ historyStack, pushToStack, popFromStack }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigationContext = (): NavigationContextType => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigationContext must be used within a NavigationProvider')
  }
  return context
}
