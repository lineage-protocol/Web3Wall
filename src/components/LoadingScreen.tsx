import React, { useEffect, useState } from 'react'

export const LoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const duration = setTimeout(() => {
      setIsLoading(false)
    }, 10000)
    return () => {
      clearTimeout(duration)
    }
  }, [])

  const spinnerStyle: React.CSSProperties = {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    animation: 'spin 1s linear infinite',
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  }

  const LoadingSpinnerComponent = () => (
    <div style={overlayStyle}>
      <div style={spinnerStyle}></div>
    </div>
  )

  return { isLoading, LoadingSpinnerComponent }
}
