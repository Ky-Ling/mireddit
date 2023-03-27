import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { AiOutlineLink } from 'react-icons/ai';
import { HiPhotograph } from 'react-icons/hi';
import Avatar from './Avatar';

type FormData = {
	postTitle: string;
	postBody: string;
	postImage: string;
	subreddit: string;
};

const PostBox = () => {
	// const { data: session  } = useSession();
	const session = true;

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	return (
		<form className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2">
			<div className="flex items-center space-x-3">
				<Avatar />
				<input
					{...register('postTitle', { required: true })}
					className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
					type="text"
					placeholder={
						session ? `Create a post by entering a title!` : 'Sign in to post'
					}
					disabled={!session}
				/>

				<HiPhotograph className={`h-6 text-gray-300 cursor-pointer`} />
				<AiOutlineLink className="h-6 text-gray-300" />
			</div>

			{!!watch('postTitle') && (
				<div>
					<div>
						<p>Body</p>
						<input
							className="m-2 flex-1 bg-blue-50 p-2 outline-none"
							{...register('postBody')}
							type="text"
							placeholder="Text (optional)"
						/>
					</div>
				</div>
			)}
		</form>
	);
};

export default PostBox;
