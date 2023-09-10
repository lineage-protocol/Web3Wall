import { Link, useNavigate, useParams } from 'react-router-dom'

const PageNewPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const onSubmit = () => {
    console.log(id)
  }

  const onGoBack = () => {
    window.history.back()
  }

  return (
    <div className="h-screen">
      <header className="bg-gray-50">
        <div className="px-4 py-2">
          <div className="">
            <div className="flex justify-between">
              <div className="relative flex items-center">
                <button className="py-2.5 text-gray-600 font-semibold">
                  Create Post
                </button>
              </div>

              <div onClick={() => onGoBack()} className="block shrink-0 py-2.5 font-semibold text-indigo-500/75 text-sm">
                Cancel
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='mx-3'>
        <label className="sr-only" htmlFor="message">
          Message
        </label>

        <textarea
          className="w-full border-none rounded-md p-3 text-sm bg-[#F1EFF3]"
          placeholder="What's happening?"
          id="message"
          rows={8}
        ></textarea>

        <div className="flex justify-start pt-2">
          <button className="bg-gray-400 px-4 py-2 bg-indigo-500/75 text-white text-sm rounded-md">Send</button>
          <div>
            <div className="flex justify-end mx-3 pt-2 items-center gap-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNewPost
