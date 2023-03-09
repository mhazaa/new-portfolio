export type Pages = 'artist' | 'writer' | 'bio' | 'resume' | 'contact';

export type Categories = 'artist' | 'writer';

export type Tags = 'fiction' | 'poetry' | 'digitalpainting' | 'photography';

export interface Post {
	id: string;
	title: string;
	medium: string;
	url: string;
	year: string;
	tags?: [Tags];
	markdown?: string;
	likes?: number;
	comments?: Comment[];
}[];

export interface SocialMediaLinks {
	instagram: string;
};

export interface Portfolio {
	artist: Post[];
	writer: Post[];
};

export interface AllData {
	socialMediaLinks: SocialMediaLinks;
	bio: string;
	portfolio: Portfolio;
};

export interface Comment {
	name: string;
	comment: string;
};

export interface LikePostData {
	userId: string;
	postId: string;
};

export interface CommentPostData {
	userId: string;
	postId: string;
	comment: Comment;
};