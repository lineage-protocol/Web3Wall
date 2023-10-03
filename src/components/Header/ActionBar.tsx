import { BackButton } from 'components/Icons/icons'
import { useNavigationContext } from 'hooks/use-navigation'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function HeaderActionBar() {
  const { popFromStack, historyStack } = useNavigationContext()

  const navigate = useNavigate()

  const goBack = () => {
    if (historyStack.length > 0) {
      popFromStack()
      navigate(-1)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <>
      <header className="bg-gray-50 fixed w-full max-w-md top-0 z-10 toolbar flex items-center">
        <div className="px-4 w-full">
          <div className="">
            <div className="flex justify-between items-center">
              <button onClick={goBack} className="block shrink-0">
                <BackButton />
              </button>

              <div className="text-right"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
