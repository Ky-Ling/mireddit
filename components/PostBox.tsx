import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { AiOutlineLink } from 'react-icons/ai';
import { HiPhotograph } from 'react-icons/hi';
import Avatar from './Avatar';
import { ADD_POST, ADD_SUBREDDIT } from '@/graphql/mutation';
import client from '@/apollo-client';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '@/graphql/queries';

type FormData = {
	postTitle: string;
	postBody: string;
	postImage: string;
	subreddit: string;
};

const PostBox = () => {
	const [imageBoxOpen, setImageBoxOpen] = useState(false);
	// const { data: session  } = useSession();
	const session = {
		user: {
			name: 'Torrid',
		},
	};

	const [addPost] = useMutation(ADD_POST, {
		refetchQueries: [GET_ALL_POSTS, 'postList'],
	});
	const [addSubreddit] = useMutation(ADD_SUBREDDIT);

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const handleFormFieldsClear = () => {
		setValue('postBody', '');
		setValue('postTitle', '');
		setValue('postImage', '');
		setValue('subreddit', '');
	};

	const handlePostFormSubmit = handleSubmit(async (formData) => {
		const notification = toast.loading('Creating new post...');

		try {
			const {
				data: { getSubredditListByTopic },
			} = await client.query({
				query: GET_SUBREDDIT_BY_TOPIC,
				variables: {
					topic: formData.subreddit,
				},
			});

			const subRedditExists = getSubredditListByTopic.length > 0;

			if (!subRedditExists) {
				console.log('Subreddit is new -> create a brand NEW subreddit!!');

				const {
					data: { insertSubreddit: newSubreddit },
				} = await addSubreddit({
					variables: {
						topic: formData.subreddit,
					},
				});

				console.log('Creating post...', formData);

				const image = formData.postImage || '';

				const {
					data: { insertPost: newPost },
				} = await addPost({
					variables: {
						body: formData.postBody,
						image,
						subreddit_id: newSubreddit.id,
						title: formData.postTitle,
						username: session?.user?.name,
					},
				});

				console.log('NEW POST Added: ', newPost);
			} else {
				console.log('Using existing subreddit...');
				console.log(getSubredditListByTopic);

				const image = formData.postImage || '';

				const {
					data: { insertPost: newPost },
				} = await addPost({
					variables: {
						body: formData.postBody,
						image,
						subreddit_id: getSubredditListByTopic[0].id,
						title: formData.postTitle,
						username: session?.user?.name,
					},
				});

				console.log('NEW POST Added: ', newPost);
			}
			handleFormFieldsClear();

			toast.success('New Post Created!', {
				id: notification,
			});
		} catch (error) {
			toast.error('Whoops, something went wrong!', {
				id: notification,
			});
		}
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
