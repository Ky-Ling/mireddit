import { useState } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import Header from '@/components/Header';
import client from '../apollo-client';
import { Toaster } from 'react-hot-toast';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const handleSearch = (searchTerm: string) => {
		setSearchTerm(searchTerm);
	};

	return (
		<ApolloProvider client={client}>
			<SessionProvider session={session}>
				<Toaster />
				<div className="h-screen overflow-y-scroll bg-slate-200">
					<Header onSearch={handleSearch} />
					<Component {...pageProps} searchTerm={searchTerm} />
				</div>
			</SessionProvider>
		</ApolloProvider>
	);
}
