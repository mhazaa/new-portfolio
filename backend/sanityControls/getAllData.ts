import { BioPage, Post, AllData } from '../../types';
import { fetch } from '.';
import { SanityDocument } from '@sanity/client';

const getAllData = async (): Promise<AllData> => {
	const bioPage: BioPage = await fetch(`
		*[_type == "bioPage"] {
			image != null => {
				"image": {
					"src": image.asset->url,
					"alt": image.asset->altText,
				},
			},
			"bio": bio,
		}[0]
	`);

	const resume: SanityDocument = await fetch (`
		*[_type == "resume"] {
			"resume": resume.asset->url,
		}[0]
	`);

	const filterPortfolio = (array: SanityDocument[]): Post[] => (
		array.map((post: SanityDocument) => (
			{
				id: post._key,
				title: post.title,
				medium: post.medium,
				year: post.year,
				publication: post.publication,
				url: post.url,
				isExternal: post.isExternal,
				markdown: post.markdown,
			}
		))
	);

	const portfolioSanityData: SanityDocument = await fetch('*[_type == "portfolio"][0]');
	const artist = filterPortfolio(portfolioSanityData?.artist || []);
	const writer = filterPortfolio(portfolioSanityData?.writer || []);

	const allData: AllData = {
		bioPage,
		resume: resume?.resume,
		portfolio: {
			artist: artist,
			writer: writer,
		},
	};

	return allData;
};

export default getAllData;