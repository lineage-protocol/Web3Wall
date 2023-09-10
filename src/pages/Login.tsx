import AddButton from 'components/Buttons/AddButton'

const PageLogin = () => {
  return (
    <>
      <div className="h-screen">
        <div className='h-full p-2'>
          <div className='border-2 border-indigo-600 h-full'>
          <div className="flex-auto flex flex-col h-2/3 items-center justify-center relative">
            <div className='text-6xl font-medium text-transparent bg-clip-text bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-600 via-indigo-300 to-indigo-900'>W3Wall</div>
            <div className='text-xl font-semibold pt-6'>Wall it up !</div>
            <div className='absolute bottom-10'>Powered by 
              <a href="" target='_blank' className='text-indigo-600'>
                <span> Lineage</span>
              </a>
            </div>
          </div>
          <div className="flex-none h-1/3 bg-gray-300 flex items-center justify-center">
            <div className="mx-auto">
              <AddButton classNames="" name="Login" onClick={() => {}} />
            </div>
          </div>
          </div>
        </div>
      </div>
      </>
  )
}

export default PageLogin
