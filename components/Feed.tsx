import React from 'react';
import { useQuery } from '@apollo/client';
import { Jelly } from '@uiball/loaders';

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

	// TODO:Empty reminder
	if (!posts?.length)
		return (
			<div className="flex w-full items-center justify-center p-10 text-xl">
				<Jelly size={50} color="#FF4501" />
			</div>
		);

	return loading ? (
		<Loading />
	) : (
		<div className="mt-5 space-y-4">
			{posts?.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};

export default Feed;
