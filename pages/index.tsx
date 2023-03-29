import Head from 'next/head';
import PostBox from '@/components/PostBox';
import Feed from '@/components/Feed';

export default function Home() {
	return (
		<div className="max-w-5xl my-7 mx-auto">
			<Head>
				<title>Reddit 2.0</title>
			</Head>
			<PostBox />

			<div>
				<Feed />
			</div>
		</div>
	);
}
