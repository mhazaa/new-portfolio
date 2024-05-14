import { TypedObject } from '@portabletext/types';

export interface Image {
	src: string;
	alt?: string;
}

export type Pages = '/' | '/artist' | '/writer' | '/bio' | '/resume' | '/contact' | '/error';

export interface BioPage {
	image?: Image;
	bio: TypedObject | TypedObject[];
};

export interface Post {
	id: string;
	title: string;
	medium: string;
	year: string;
	publication?: string;
	url: string;
	externalUrl?: string;
	markdown?: TypedObject | TypedObject[];
};

export interface Portfolio {
	artist: Post[];
	writer: Post[];
};

export interface AllData {
	bioPage: BioPage;
	resume: string;
	portfolio: Portfolio;
};

export interface PostContactFormData {
	userId: string;
	name: string;
	email: string;
	message: string;
};