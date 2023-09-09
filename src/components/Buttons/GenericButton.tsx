interface ButtonProp {
  className: string
  name: string
  onClick: (e: any) => void
  icon?: React.ReactNode
}

const GenericButton = ({ name, onClick, icon }: ButtonProp) => {
  return (
    <button
      className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      onClick={e => onClick(e)}
    >
      <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
      <span className="flex items-center relative border border-current bg-white px-8 py-3">
        {icon}
        {name}
      </span>
    </button>
  )
}

export default GenericButton
