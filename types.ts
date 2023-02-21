export type Pages = '' | 'home' | 'about' | 'contact' | 'quote' | 'work' | 'decision';

export interface Comment {
	name: string;
	comment: string;
};

export interface Posts {
	title: string;
	url: string;
	index: number;
	tags: [string];
	markup: string;
	likes: number;
	comments: Comment[];
}[];

export interface LikeData {
	userId: string;
	postId: string;
};

export interface CommentData {
	userId: string;
	postId: string;
	comment: Comment;
};