import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<div className="">
			<Head>
				<title>Reddit 2.0</title>
			</Head>
			<h1>home</h1>
		</div>
	);
}
