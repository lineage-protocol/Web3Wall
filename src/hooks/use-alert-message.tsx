import { ErrorMessage, SuccessMessage } from '../components/Icons/icons'
import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react'

interface AlertMessageContextInterface {
  errorMessage: string | null
  showError: (message: string) => void
  hideError: () => void
  showSuccess: (message: string) => void
  hideSuccess: () => void
}

export const AlertMessageContext = createContext<AlertMessageContextInterface>({
  errorMessage: null,
  showError: () => {},
  hideError: () => {},
  showSuccess: () => {},
  hideSuccess: () => {},
})

interface AlertMessageProviderProps {
  children: ReactNode
}

export const AlertMessageProvider = ({ children }: AlertMessageProviderProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const showError = (message: string) => {
    setErrorMessage(message)
  }

  const hideError = () => {
    setErrorMessage(null)
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
  }

  const hideSuccess = () => {
    setSuccessMessage(null)
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (errorMessage) {
      timeout = setTimeout(() => {
        hideError()
      }, 5000)
    }

    if (successMessage) {
      timeout = setTimeout(() => {
        hideSuccess()
      }, 5000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [errorMessage, successMessage])

  return (
    <AlertMessageContext.Provider value={{ errorMessage, showError, hideError, showSuccess, hideSuccess }}>
      <div className="absolute inset-x-0 z-50 flex justify-center">
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {successMessage && <SuccessMessage message={successMessage} />}
      </div>
      {children}
    </AlertMessageContext.Provider>
  )
}

export const useAlertMessage = () => {
  const context = useContext(AlertMessageContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertMessageProvider')
  }
  return context
}
