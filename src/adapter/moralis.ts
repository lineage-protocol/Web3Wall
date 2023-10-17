import Moralis from 'moralis'

const instance = Moralis.start({
  apiKey: `${import.meta.env.VITE_MORALIS_API_KEY}`,
})

export default instance