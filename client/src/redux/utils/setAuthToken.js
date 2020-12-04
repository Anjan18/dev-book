import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({ uri: 'https://localhost:3000/graphql' })

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('jwtToken')

	return {
		headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

export default client
