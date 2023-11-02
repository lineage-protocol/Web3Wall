// ExpandableInput.js
import React, { useRef, useState } from 'react'

interface ExpandableInputProps {
  name: string
  placeholder?: string
  initialWidth: number
  extraPadding: number
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ExpandableInput: React.FC<ExpandableInputProps> = ({
  placeholder = 'Type here...',
  onChange,
  name,
  onBlur,
  initialWidth,
  extraPadding,
  value,
}) => {
  const [width, setWidth] = useState<number>(initialWidth ?? 130) // Initial width
  const inputRef = useRef<HTMLInputElement | null>(null)
  const tempElRef = useRef<HTMLSpanElement | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempEl = tempElRef.current
    const input = inputRef.current

    if (tempEl && input) {
      tempEl.textContent = input.value
      const newWidth = tempEl.getBoundingClientRect().width

      setWidth(newWidth + extraPadding ?? 0)
    }

    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        style={{ width, transition: 'width 0.2s' }}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="text-sm text-black px-1 py-0 border-0 border-b-2 border-b-black text-center font-medium"
        name={name}
        value={value}
        onBlur={onBlur}
      />
      <span ref={tempElRef} style={{ position: 'absolute', left: '-9999px' }}></span>
    </div>
  )
}

export default ExpandableInput
