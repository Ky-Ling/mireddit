import React from 'react';

interface PostProps {
	post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
	return <div>Post</div>;
};

export default Post;
