import Head from 'next/head';
import PostBox from '@/components/PostBox';
import Feed from '@/components/Feed';
import { useQuery } from '@apollo/client';
import { GET_SUBREDDITS_WITH_LIMIT } from '@/graphql/queries';
import SubredditRow from '@/components/SubredditRow';
import Loading from '@/components/Loading';
import { Empty } from 'antd';

export default function Home() {
	const { data, loading } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
		variables: {
			limit: 10,
		},
	});

	const subreddits: Subreddit[] = data?.getSubredditListLimit;

	return (
		<div className="max-w-5xl my-7 mx-auto">
			<Head>
				<title>Reddit 2.0</title>
			</Head>
			<PostBox />

			<div className="flex justify-end">
				<Feed />
				<div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
					<p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
					{loading ? (
						<Loading />
					) : subreddits?.length ? (
						<div>
							{subreddits?.map((subreddit, i) => (
								<SubredditRow
									key={subreddit.id}
									topic={subreddit.topic}
									index={i}
								/>
							))}
						</div>
					) : (
						<div className="mb-5">
							<Empty description="No communities" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
