import { ApolloClient, InMemoryCache } from '@apollo/client'

export const instance = new ApolloClient({
  uri: import.meta.env.VITE_WEB3WALL_SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
})

export default instance
