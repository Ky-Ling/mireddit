import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			toast.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) toast.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
	uri: 'https://mecheria.stepzen.net/api/filled-lion/__graphql',
	headers: {
		Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
	},
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: from([errorLink, httpLink]),
});

export default client;
