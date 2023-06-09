import React from 'react';
import Link from 'next/link';
import { BsChevronUp } from 'react-icons/bs';
import Avatar from './Avatar';

interface SubredditRowProps {
	topic: string;
	index: number;
}

const SubredditRow = ({ index, topic }: SubredditRowProps) => {
	return (
		<div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
			<p>{index + 1}</p>
			<BsChevronUp className="h-4 w-4 flex-shrink-0 text-green-400" />
			<Avatar seed={`/subreddit/${topic}`} />
			<p className="flex-1 truncate">r/{topic}</p>
			<Link href={`/subreddit/${topic}`}>
				<div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">
					View
				</div>
			</Link>
		</div>
	);
};

export default SubredditRow;
