import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default () => {
  const httpLink = new HttpLink({uri: 'https://api.github.com/graphql'})
  const token = process.env.GITHUB_TOKEN
  const authLink = setContext((_, { headers }) => {
    return {
      headers: { Authorization: `bearer ${token}`}
    }
  })
  const link = ApolloLink.from([
    authLink,
    httpLink
  ])

  return {
    link,
    cache: new InMemoryCache()
  }
}
