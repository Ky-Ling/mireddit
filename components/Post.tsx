import React from 'react';

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

interface PostProps {
	post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
	return (
		<div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
			<div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
				<AiOutlineArrowUp className="voteButtons hover:text-red-400" />
				<p className="text-black font-bold text-xs">0</p>
				<AiOutlineArrowDown className="voteButtons hover:text-blue-400" />
			</div>
			<div className="p-3 pb-1">
				<div className="flex items-center space-x-2">
					<Avatar seed={post.subreddit[0]?.topic} />
					<p className="text-xs text-gray-400">
						<span className="font-bold text-black hover:text-blue-400 hover:underline">
							r/{post.subreddit[0]?.topic}
						</span>{' '}
						&bull; Posted by u/{post.username} <TimAgo date={post.created_at} />
					</p>
				</div>
			</div>
		</div>
	);
};

export default Post;
