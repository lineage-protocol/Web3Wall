interface ButtonProp {
  className: string
  name: string
  onClick: (e: any) => void
  icon?: React.ReactNode
  disabled?: boolean
}

const GenericButton = ({ name, onClick, icon, className, disabled }: ButtonProp) => {
  return (
    <button
      disabled={disabled}
      className={`group relative inline-block text-sm font-medium text-black focus:outline-none focus:ring active:text-gray-500 ${
        className ?? ''
      } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={e => onClick(e)}
    >
      <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-black transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
      <span className="flex items-center justify-center relative border border-current bg-white px-8 py-3">
        {icon}
        <span className="ml-1">{name}</span>
      </span>
    </button>
  )
}

export default GenericButton
