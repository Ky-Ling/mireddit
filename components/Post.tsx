import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import {
	AiOutlineArrowDown,
	AiOutlineArrowUp,
	AiOutlineGift,
	AiOutlineShareAlt,
} from 'react-icons/ai';
import { BsBookmarkCheck } from 'react-icons/bs';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { RxDotsHorizontal } from 'react-icons/rx';
import TimAgo from 'react-timeago';
import Avatar from './Avatar';
import Loading from './Loading';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_ALL_VOTES_BY_POST_ID } from '@/graphql/queries';
import { ADD_VOTE, DELETE_POST } from '@/graphql/mutation';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';

interface PostProps {
	post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
	const router = useRouter();
	const [vote, setVote] = useState<boolean>();
	const { data: session } = useSession();

	const { data } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
		variables: {
			post_id: post?.id,
		},
	});

	const handlePageRedirect = () => {
		if (router.query.topic) {
			router.push(`/post/[postId]`, `/post/${post.id}`);
			return;
		}

		if (!router.query.postId) {
			router.push(`post/${post.id}`);
		}
	};

	const [addVote] = useMutation(ADD_VOTE, {
		refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId'],
	});

	const [deletePost] = useMutation(DELETE_POST);

	const upVote = async (isUpvote: boolean) => {
		if (!session) {
			toast.error("You'll need to sign in to vote!");
			return;
		}

		if (vote && isUpvote) return;

		if (vote === false && !isUpvote) return;

		await addVote({
			variables: {
				post_id: post?.id,
				username: session?.user?.name,
				upvote: isUpvote,
			},
		});
	};

	const displayVotes = (data: any) => {
		const votes: Vote[] = data?.getVotesByPostId;
		const displayNumber = votes?.reduce(
			(total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
			0
		);

		if (votes?.length === 0) return 0;
		if (displayNumber === 0) {
			return votes[0]?.upvote ? 1 : -1;
		}

		return displayNumber;
	};

	useEffect(() => {
		const votes: Vote[] = data?.getVotesByPostId;

		const vote = votes?.find(
			(vote) => vote.username === session?.user?.name
		)?.upvote;
		setVote(vote);
	}, [data]);

	const handlePostDelete = async () => {
		if (!router.query.postId) return;

		const data = await deletePost({
			variables: {
				id: router.query.postId,
			},
		});
		console.log(data);
	};

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: 'Edit',
		},
		{
			key: '2',
			label: 'Delete',
			danger: true,
			onClick: handlePostDelete,
		},
	];

	return !post && !router.query.postId ? (
		<Loading />
	) : (
		<div className="relative">
			<div
				onClick={handlePageRedirect}
				className={`flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm ${
					!router.query.postId && 'hover:border hover:border-gray-600'
				} `}
			>
				<div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
					<AiOutlineArrowUp
						onClick={(e) => {
							e.stopPropagation();
							upVote(true);
						}}
						className={`voteButtons hover:text-red-400 ${
							vote && 'text-red-400'
						}`}
					/>
					<p className="text-black font-bold text-xs">{displayVotes(data)}</p>
					<AiOutlineArrowDown
						onClick={(e) => {
							e.stopPropagation();
							upVote(false);
						}}
						className={`voteButtons hover:text-blue-400 ${
							vote === false && 'text-blue-400'
						}`}
					/>
				</div>
				<div className="p-3 pb-1">
					<div className="flex items-center space-x-2">
						<Avatar seed={post?.subreddit[0]?.topic} />
						<p className="text-xs text-gray-400">
							<Link
								href={`/subreddit/${post?.subreddit[0]?.topic}`}
								onClick={(e) => e.stopPropagation()}
							>
								<span className="font-bold text-black hover:text-blue-400 hover:underline">
									r/{post?.subreddit[0]?.topic}
								</span>
							</Link>{' '}
							&bull; Posted by u/{post?.username}{' '}
							<TimAgo date={post?.created_at} />
						</p>
					</div>

					<div className="py-4">
						<h2 className="text-xl font-semibold">{post?.title}</h2>
						<p className="mt-2 text-sm font-light">{post?.body}</p>
					</div>

					<img
						src={post?.image}
						className="w-full"
						onClick={(e) => e.stopPropagation()}
					/>

					<div className="flex space-x-4 text-gray-400">
						<div className="postButtons">
							<HiOutlineChatAlt2 className="h-6 w-6" />
							<p className="">{post?.comments?.length} Comments</p>
						</div>
						<div className="postButtons">
							<AiOutlineGift className="h-6 w-6" />
							<p className="hidden sm:inline">Award</p>
						</div>
						<div className="postButtons">
							<AiOutlineShareAlt className="h-6 w-6" />
							<p className="hidden sm:inline">Share</p>
						</div>
						<div className="postButtons">
							<BsBookmarkCheck className="h-6 w-6" />
							<p className="hidden sm:inline">Save</p>
						</div>
						<div className="postButtons">
							<RxDotsHorizontal className="h-6 w-6" />
						</div>
					</div>
				</div>
			</div>
			{router.query.postId && post?.username === session?.user?.name && (
				<div className="absolute top-0 right-0 p-4">
					<Dropdown menu={{ items }} placement="bottomRight" arrow>
						<Button
							type="ghost"
							icon={<RxDotsHorizontal className="h-6 w-6" />}
						/>
					</Dropdown>
				</div>
			)}
		</div>
	);
};

export default Post;
