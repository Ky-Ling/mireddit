import React from 'react';
import { useQuery } from '@apollo/client';
import { Empty } from 'antd';

import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '@/graphql/queries';
import Post from './Post';
import Loading from './Loading';

interface FeedProps {
	topic?: string;
}

const Feed = ({ topic }: FeedProps) => {
	const { data, loading, error } = !topic
		? useQuery(GET_ALL_POSTS)
		: useQuery(GET_ALL_POSTS_BY_TOPIC, {
				variables: {
					topic: topic,
				},
		  });

	const posts: Post[] = !topic ? data?.postList : data?.getPostListByTopic;

	return loading ? (
		<Loading />
	) : posts.length ? (
		<div className="mt-5 space-y-4">
			{posts?.map((post: any) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	) : (
		<div className="flex items-center justify-center flex-1 cursor-pointer mt-5 ml-auto rounded-md border border-gray-300 bg-white shadow-sm">
			<Empty description="No post yet" />
		</div>
	);
};

export default Feed;
