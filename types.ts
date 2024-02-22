import { TypedObject } from '@portabletext/types';

export type Pages = '/' | '/artist' | '/writer' | '/bio' | '/resume' | '/contact' | '/error';

export interface BioPage {
	bio: string | TypedObject | TypedObject[];
};

export interface SocialMediaLinks {
	instagram: string;
	github: string;
	spotify: string;
};

export interface Post {
	postId: string;
	title: string;
	medium: string;
	url: string;
	year: string;
	markdown?: TypedObject | TypedObject[];
}[];

export interface Portfolio {
	artist: Post[];
	writer: Post[];
};

export interface AllData {
	bioPage: BioPage;
	socialMediaLinks: SocialMediaLinks;
	portfolio: Portfolio;
};

export interface PostContactFormData {
	userId: string;
	name: string;
	email: string;
	message: string;
};