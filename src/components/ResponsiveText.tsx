import React, { ReactNode, useEffect, useRef } from 'react'

interface ResponsiveTextProps {
  children: ReactNode
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({ children }) => {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const adjustFontSize = () => {
      if (textRef.current && typeof children === 'string') {
        const maxLength = 280 // maximum length of the text
        const minFontSize = 14 // minimum font size in pixels
        const maxFontSize = 32 // maximum font size in pixels
        const fontSize = Math.max(
          minFontSize,
          maxFontSize - (children.length * (maxFontSize - minFontSize)) / maxLength
        )
        textRef.current.style.fontSize = `${fontSize}px`
      }
    }

    adjustFontSize()
  }, [children])

  return (
    <div ref={textRef} className="px-3">
      {children}
    </div>
  )
}

export default ResponsiveText
