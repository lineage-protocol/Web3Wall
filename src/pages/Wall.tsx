import SocialCard from 'components/SocialCard'
import { useNavigate } from 'react-router-dom'

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
]

const PageWall = () => {
  const navigate = useNavigate()

  const createNewPost = () => {
    navigate('/new/1')
  }

  return (
    <>
      <div className="grid gap-3 overflow-auto bg-blue-800/30">
        {socials.map((social, index) => {
          return <SocialCard key={index} {...social} />
        })}
      </div>
      <button
        onClick={() => createNewPost()}
        className="absolute bottom-5 right-5 bg-blue-500 text-white h-24 w-24 rounded-full flex items-center justify-center text-2xl"
      >
        +
      </button>
    </>
  )
}

export default PageWall
