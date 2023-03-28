type Comment = {
	created_at: string;
	id: number;
	text: string;
	post_id: number;
	username: string;
};

type Vote = {
	created_at: string;
	id: number;
	post_id: number;
	upvote: boolean;
	username: string;
};

type Subreddit = {
	created_at: string;
	id: number;
	topic: string;
};

type Post = {
	body: string;
	created_at: string;
	id: number;
	image: string;
	title: string;
	subreddit_id: number;
	username: string;
	vote: Vote[];
	comment: Comment[];
	subreddit: Subreddit[];
};
