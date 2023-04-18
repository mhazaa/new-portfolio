
import { BioPage, SocialMediaLinks, Post, AllData } from '../../types';
import { fetch } from '.';
import { SanityDocument } from '@sanity/client';

const getAllData = async (): Promise<AllData> => {
	const bioPageSanityData: SanityDocument = await fetch('*[_type == "bioPage"]');
	const bioPage: BioPage = {
		bio: bioPageSanityData[0].bio,
	};

	const socialMediaLinksSanityData: SanityDocument = await fetch('*[_type == "socialMediaLinks"]');
	const socialMediaLinks: SocialMediaLinks = {
		instagram: socialMediaLinksSanityData[0].links.instagram,
		github: socialMediaLinksSanityData[0].links.github,
		spotify: socialMediaLinksSanityData[0].links.spotify,
	};

	const artistPortfolioSanityData: SanityDocument = await fetch('*[_type == "artistPortfolio"]');
	const artistPortfolio: Post[] = artistPortfolioSanityData.map((document: SanityDocument) => document.post);

	const writerPortfolioSanityData: SanityDocument = await fetch('*[_type == "writerPortfolio"]');
	const writerPortfolio: Post[] = writerPortfolioSanityData.map((document: SanityDocument) => document.post);

	const allData: AllData = {
		bioPage,
		socialMediaLinks,
		portfolio: {
			artist: artistPortfolio,
			writer: writerPortfolio,
		},
	};

	return allData;
};

export default getAllData; 