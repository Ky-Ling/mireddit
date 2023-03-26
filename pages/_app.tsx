import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import Header from '@/components/Header';
import client from '../apollo-client';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={session}>
				<div className="h-screen overflow-y-scroll bg-slate-200">
					<Header />
					<Component {...pageProps} />
				</div>
			</SessionProvider>
		</ApolloProvider>
	);
}
