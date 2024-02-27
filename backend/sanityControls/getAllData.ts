
import { BioPage, Post, AllData } from '../../types';
import { fetch } from '.';
import { SanityDocument } from '@sanity/client';

const getAllData = async (): Promise<AllData> => {
	const bioPageSanityData: SanityDocument = await fetch('*[_type == "bioPage"]');
	const bioPage: BioPage = {
		bio: bioPageSanityData[0].bio,
	};

	const artistPortfolioSanityData: SanityDocument = await fetch('*[_type == "artistPortfolio"]');
	const artistPortfolio: Post[] = artistPortfolioSanityData.map((document: SanityDocument) => document?.post);

	const writerPortfolioSanityData: SanityDocument = await fetch('*[_type == "writerPortfolio"]');
	const writerPortfolio: Post[] = writerPortfolioSanityData.map((document: SanityDocument) => document?.post);

	const allData: AllData = {
		bioPage,
		portfolio: {
			artist: artistPortfolio,
			writer: writerPortfolio,
		},
	};

	return allData;
};

export default getAllData;