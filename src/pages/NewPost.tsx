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
                <button onClick={() => onGoBack()} className="p-2.5 text-gray-600">
                  Cancel
                </button>
              </div>

              <a href="#" className="block shrink-0 p-2.5 font-semibold text-blue-600">
                Post
              </a>
            </div>
          </div>
        </div>
      </header>
      <div>
        <label className="sr-only" htmlFor="message">
          Message
        </label>

        <textarea
          className="w-full border-none p-3 text-sm"
          placeholder="What's happening?"
          id="message"
          rows={8}
        ></textarea>

        <div className="flex justify-left p-3">
          <button className="bg-gray-400 p-3">Photo/Video</button>
        </div>
      </div>
    </div>
  )
}

export default PageNewPost
