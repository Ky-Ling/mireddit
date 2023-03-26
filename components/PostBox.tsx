import React from 'react';
import { useSession } from 'next-auth/react';
import Avatar from './Avatar';

const PostBox = () => {
	// const { data: session  } = useSession();
	const session = true;

	return (
		<form>
			<div className="flex items-center space-x-3">
				<Avatar />
				<input
					className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
					type="text"
					placeholder={
						session ? `Create a post by entering a title!` : 'Sign in to post'
					}
					disabled={!session}
				/>
			</div>
		</form>
	);
};

export default PostBox;
