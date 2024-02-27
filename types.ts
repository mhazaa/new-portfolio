import { TypedObject } from '@portabletext/types';

export type Pages = '/' | '/artist' | '/writer' | '/bio' | '/resume' | '/contact' | '/error';

export interface BioPage {
	bio: string | TypedObject | TypedObject[];
};

export interface Post {
	postId: string;
	title: string;
	medium: string;
	year: string;
	publication?: string;
	url: string;
	isExternal?: boolean;
	markdown?: TypedObject | TypedObject[];
}[];

export interface Portfolio {
	artist: Post[];
	writer: Post[];
};

export interface AllData {
	bioPage: BioPage;
	portfolio: Portfolio;
};

export interface PostContactFormData {
	userId: string;
	name: string;
	email: string;
	message: string;
};