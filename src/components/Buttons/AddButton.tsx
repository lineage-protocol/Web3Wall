interface ButtonProp {
  classNames: String
  name: String
  onClick: (e: any) => void
}

function AddActiveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 mr-1"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

const AddButton = (props: ButtonProp) => {
  return (
    <button
      className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      onClick={e => props.onClick(e)}
    >
      <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

      <span className="flex items-center relative block border border-current bg-white px-8 py-3">
        <AddActiveIcon />
        {props.name}
      </span>
    </button>
  )
}

export default AddButton
