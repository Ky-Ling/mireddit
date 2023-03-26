import Head from 'next/head';
import PostBox from '@/components/PostBox';

export default function Home() {
	return (
		<div className="">
			<Head>
				<title>Reddit 2.0</title>
			</Head>
			<PostBox />
		</div>
	);
}
