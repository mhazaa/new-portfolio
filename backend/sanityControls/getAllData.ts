import { BioPage, Portfolio, AllData } from '../../types';
import { fetch } from '.';
import { SanityDocument } from '@sanity/client';

const getAllData = async (): Promise<AllData> => {
	const bioPage: BioPage = await fetch(`
		*[_type == 'bioPage'][0] {
			image != null => {
				'image': {
					'src': image.asset -> url,
					'alt': image.asset -> altText,
				},
			},
			'bio': bio,
		}
	`);

	const resumeDocument: SanityDocument = await fetch (`
		*[_type == 'resume'][0] {
			'resume': resume.asset -> url,
		}
	`);

	const resume: string = resumeDocument?.resume;

	const postGROQ = `
		{ 
			'id': _id,
			title,
			medium,
			year,
			category,
			publication,
			internalUrl,
			externalUrl,
			'markdown': markdown[] {
		 		_type == 'block' => {
					...,
		  		},
				_type == 'image' => { 
					'_type': 'image',
					'src': asset -> url,
					'alt': asset -> altText,
				},
				_type == 'video' => { 
					'_type': 'video',
					src,
				},
			}, 
		},
	`;

	const portfolio: Portfolio = await fetch(`
		*[_type == 'portfolio'][0] {
			artist[] -> ${postGROQ}
			writer[] -> ${postGROQ}
	  	}
	`);

	const allData: AllData = {
		bioPage,
		resume,
		portfolio: {
			artist: portfolio.artist || [],
			writer: portfolio.writer || [],
		},
	};

	return allData;
};

export default getAllData;