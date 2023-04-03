import React from 'react';
import { useQuery } from '@apollo/client';
import { Empty } from 'antd';
import {
	GET_ALL_POSTS,
	GET_ALL_POSTS_BY_SEARCH,
	GET_ALL_POSTS_BY_TOPIC,
} from '@/graphql/queries';
import Post from './Post';
import Loading from './Loading';
import {
	POST_LIST_SCHEMA,
	GET_POST_LIST_BY_TOPIC_SCHEMA,
	GET_POST_LIST_BY_SEARCH_SCHEMA,
} from '../constants';

interface FeedProps {
	topic?: string;
	searchTerm?: string;
}

type Fetcher = {
	fetcher: any;
	querySchemaName: string;
};
// type Fetcher<TData> = {
// 	fetcher: () => {
//     data: TData | undefined;
//     loading: boolean;
//     error?: ApolloError;
//   };
// 	querySchemaName: string;
// };

const Feed = ({ topic, searchTerm }: FeedProps) => {
	const getPostDataMap: Record<string, Fetcher> = {
		default: {
			fetcher: useQuery(GET_ALL_POSTS),
			querySchemaName: POST_LIST_SCHEMA,
		},
		topic: {
			fetcher: useQuery(GET_ALL_POSTS_BY_TOPIC, {
				skip: !topic,
				variables: {
					topic,
				},
			}),
			querySchemaName: GET_POST_LIST_BY_TOPIC_SCHEMA,
		},
		searchTerm: {
			fetcher: useQuery(GET_ALL_POSTS_BY_SEARCH, {
				skip: !searchTerm,
				variables: {
					search: searchTerm,
				},
			}),
			querySchemaName: GET_POST_LIST_BY_SEARCH_SCHEMA,
		},
	};

	const { data, loading } =
		topic || searchTerm
			? getPostDataMap[topic ? 'topic' : 'searchTerm'].fetcher
			: getPostDataMap.default.fetcher;

	const posts: Post[] = topic
		? data?.getPostListByTopic
		: searchTerm
		? data?.getPostListBySearch
		: data?.postList;

	return loading ? (
		<Loading />
	) : posts?.length ? (
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
