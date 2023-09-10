import SocialCard from 'components/SocialCard'
import { useNavigate, useParams } from 'react-router-dom'

const socials = [
  {
    public_key: '0x6B7E30392cA820C865dc5ea6EA0D2fD7f3343696',
    text: 'Hello',
    image: '',
  },
  {
    public_key: '0x6B7E30392cA820C865dc5ea6EA0D2fD7f3343696',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut dignissim leo, eu condimentum nisi. Donec et arcu et mi sodales scelerisque. Vivamus vitae nibh eu purus dignissim pulvinar sit amet eget ipsum. Ut vel varius quam. Duis interdum mollis lorem ut elementum. Pellentesque vitae mi sagittis, dapibus diam ac, lacinia nibh. Integer at convallis diam. Donec vel ligula vel nisl rutrum dictum sit amet sit amet quam',
    image: '',
  },
  {
    public_key: '0x6B7E30392cA820C865dc5ea6EA0D2fD7f3343696',
    text: '',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    public_key: '0x6B7E30392cA820C865dc5ea6EA0D2fD7f3343696',
    text: 'Hello',
    image: '',
  },
  {
    public_key: '0x6B7E30392cA820C865dc5ea6EA0D2fD7f3343696',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut dignissim leo, eu condimentum nisi. Donec et arcu et mi sodales scelerisque. Vivamus vitae nibh eu purus dignissim pulvinar sit amet eget ipsum. Ut vel varius quam. Duis interdum mollis lorem ut elementum. Pellentesque vitae mi sagittis, dapibus diam ac, lacinia nibh. Integer at convallis diam. Donec vel ligula vel nisl rutrum dictum sit amet sit amet quam',
    image: '',
  },
  {
    public_key: '0x6B7E30392cA820C865dc5ea6EA0D2fD7f3343696',
    text: '',
    image:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  }
]

const PageWall = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const createNewPost = () => {
    navigate(`/new/${id}`)
  }


  return (
    <>
    <div className='relative'>
      <div className='grid grid-cols-3 text-center mt-6 text-sm'>
          <div className='col-span-1 group cursor-pointer pb-1'>
              <span className='group-hover:border-b-2 border-black transition duration-300'>All</span>
          </div>
          <div className='col-span-1 group cursor-pointer pb-1'>
              <span className='group-hover:border-b-2 border-black transition duration-300'>Text</span>
          </div>
          <div className='col-span-1 group cursor-pointer pb-1'>
              <span className='group-hover:border-b-2 border-black transition duration-300'>Photos</span>
          </div>
      </div>
      <div className="grid gap-1 overflow-auto min-h-screen bg-white">
        {socials.map((social, index) => {
          return <SocialCard key={index} {...social} />
        })}
      </div>
      
      <button
        onClick={() => createNewPost()}
        className="fixed bottom-5 right-5 bg-blue-500 text-white h-24 w-24 rounded-full flex items-center justify-center text-2xl"
      >
        +
      </button>
    </div>
    </>
  )
}

export default PageWall
