import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POST_BY_POST_ID } from '@/graphql/queries';
import Post from '@/components/Post';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ADD_COMMENT } from '@/graphql/mutation';
import Avatar from '@/components/Avatar';
import Timeago from 'react-timeago';
import Loading from '@/components/Loading';

type FormData = {
	comment: string;
};

const PostItemPage = () => {
	const {
		query: { postId },
	} = useRouter();
	const { data: session } = useSession();

	const [addComment] = useMutation(ADD_COMMENT, {
		refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostId'],
	});
	const { data, loading } = useQuery(GET_POST_BY_POST_ID, {
		variables: {
			post_id: postId,
		},
	});

	const post: Post = data?.getPostByPostId;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		if (!data.comment) return;
		const notification = toast.loading('Posting your comment...');

		await addComment({
			variables: {
				post_id: postId,
				username: session?.user?.name,
				text: data.comment,
			},
		});

		setValue('comment', '');
		toast.success('Comment posted successfully!', {
			id: notification,
		});
	};

	return loading ? (
		<Loading />
	) : (
		<div className="mx-auto my-7 max-w-5xl">
			<Post post={post} />

			<div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
				<p className="text-sm mb-1">
					Comment as <span className="text-red-500">{session?.user?.name}</span>
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-2"
				>
					<textarea
						{...register('comment')}
						className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
						placeholder={
							session ? 'What are your thoughts?' : 'Please sign in to comment'
						}
						disabled={!session}
					/>

					<button
						type="submit"
						disabled={!session}
						className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
					>
						Comment
					</button>
				</form>
			</div>

			<div className="-my-5 rounded-b-md border border-t-0  border-gray-300 bg-white py-5 px-10">
				<hr className="py-2" />
				{post?.comments.map((comment: any) => (
					<div
						className="relative flex items-center space-x-2 space-y-5 "
						key={comment.id}
					>
						<hr className="absolute top-10 h-16 border left-7 z-0" />
						<div className="z-50">
							<Avatar seed={comment.username} />
						</div>

						<div className="flex flex-col">
							<p className="py-2 text-xs text-gray-400 ">
								<span className="font-semibold text-gray-600">
									{comment.username}
								</span>
								&nbsp; &bull; <Timeago date={comment.created_at} />
							</p>
							<p>{comment.text}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PostItemPage;
