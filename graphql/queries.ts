import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
	query MyQuery {
		postList {
			body
			created_at
			id
			image
			title
			subreddit_id
			username

			comment {
				created_at
				id
				text
				post_id
				username
			}

			subreddit {
				created_at
				id
				topic
			}

			vote {
				created_at
				id
				post_id
				upvote
				username
			}
		}
	}
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
	query MyQuery($topic: String!) {
		getSubredditListByTopic(topic: $topic) {
			id
			topic
			created_at
		}
	}
`;
