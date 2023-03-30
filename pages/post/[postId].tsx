import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_POST_ID } from '@/graphql/queries';
import Post from '@/components/Post';

const PostItemPage = () => {
	const {
		query: { postId },
	} = useRouter();

	const { data } = useQuery(GET_POST_BY_POST_ID, {
		variables: {
			post_id: postId,
		},
	});

	const post: Post = data?.getPostByPostId;

	return (
		<div className='mx-auto my-7 max-w-5xl'>
			<Post post={post} />
		</div>
	);
};

export default PostItemPage;
