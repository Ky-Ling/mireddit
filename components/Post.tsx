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

interface PostProps {
	post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
	return (
		<div>
			<div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
				<AiOutlineArrowUp className="voteButtons hover:text-red-400" />
				<p className="text-black font-bold text-xs">0</p>
				<AiOutlineArrowDown className="voteButtons hover:text-blue-400" />
			</div>
			<div>
				<div></div>
			</div>
		</div>
	);
};

export default Post;
