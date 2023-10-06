import { LockClosedIcon } from '@heroicons/react/24/outline'
import { CloseIcon } from 'components/Icons/icons'

interface Prop {
  show: boolean
  onClose: () => void
}
const AddToHomeScreenModal = (prop: Prop) => {
  return (
    <div className={`h-screen bg-black/20 w-full ${!prop.show ? `hidden` : ``}`}>
      <div className="absolute w-4/5 m-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 right-0">
        <div className="animate-background bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 shadow-lg transition bg-[length:400%_400%] [animation-duration:_4s] rounded-lg border border-gray-100 bg-white p-1">
          <div className="rounded-[10px] bg-white p-6">
            <div className="flex justify-end">
              <button onClick={prop.onClose}>
                <CloseIcon />
              </button>
            </div>
            <span className="inline-block rounded-lg bg-yellow-600 p-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <h3 className="mt-2 text-xl font-medium text-gray-900">Add To Home Screen</h3>

            <p className="mt-2 text-sm/relaxed text-gray-500">
              To install the app on your device, please tap the <b>Share</b> icon in your browser menu, then select{' '}
              <b>Add to Home Screen</b> from the options, and finally, open the app from your home screen
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddToHomeScreenModal
