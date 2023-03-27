import React, { useState } from 'react';
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
	const [imageBoxOpen, setImageBoxOpen] = useState(false);
	// const { data: session  } = useSession();
	const session = true;

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const handlePostFormSubmit = handleSubmit(async (formData) => {
		console.log(formData)
	});

	return (
		<form
			onSubmit={handlePostFormSubmit}
			className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2"
		>
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

				<HiPhotograph
					onClick={() => setImageBoxOpen(!imageBoxOpen)}
					className={`h-6 text-gray-300 cursor-pointer ${
						imageBoxOpen && 'text-blue-300'
					}`}
				/>
				<AiOutlineLink className="h-6 text-gray-300" />
			</div>

			{!!watch('postTitle') && (
				<div className="flex flex-col py-2">
					<div className="flex items-center px-2">
						<p className="min-w-[90px]">Body: </p>
						<input
							className="m-2 flex-1 bg-blue-50 p-2 outline-none"
							{...register('postBody')}
							type="text"
							placeholder="Text (optional)"
						/>
					</div>

					<div className="flex items-center px-2">
						<p className="min-w-[90px]">Subreddit: </p>
						<input
							className="m-2 flex-1 bg-blue-50 p-2 outline-none"
							{...register('subreddit', { required: true })}
							type="text"
							placeholder="i.e. reactjs"
						/>
					</div>

					{imageBoxOpen && (
						<div className="flex items-center px-2">
							<p className="min-w-[90px]">Image URL: </p>
							<input
								className="m-2 flex-1 bg-blue-50 p-2 outline-none"
								{...register('postImage')}
								type="text"
								placeholder="Optional..."
							/>
						</div>
					)}

					{Object.keys(errors).length > 0 && (
						<div className="space-y-2 p-2 text-red-500">
							{errors.postTitle?.type === 'required' && (
								<p>- A post title is required</p>
							)}

							{errors.subreddit?.type === 'required' && (
								<p>- A post title is required</p>
							)}
						</div>
					)}

					{!!watch('postTitle') && (
						<button
							type="submit"
							className="w-full rounded-full bg-blue-400 p-2 text-white"
						>
							Create Post
						</button>
					)}
				</div>
			)}
		</form>
	);
};

export default PostBox;
