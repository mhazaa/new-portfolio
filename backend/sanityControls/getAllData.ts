import { BioPage, Portfolio, AllData } from '../../types';
import { fetch } from '.';
import { SanityDocument } from '@sanity/client';

const getAllData = async (): Promise<AllData> => {
	const bioPage: BioPage = await fetch(`
		*[_type == 'bioPage'][0] {
			image != null => {
				'image': {
					'src': image.asset->url,
					'alt': image.asset->altText,
				},
			},
			'bio': bio,
		}
	`);

	const resume: SanityDocument = await fetch (`
		*[_type == 'resume'][0] {
			'resume': resume.asset->url,
		}
	`);

	const portfolioGROQ = `
		_type == 'post' => { 
			'id': _key,
			title,
			medium,
			year,
			publication,
			url,
			externalUrl,
			'markdown': markdown[] {
		 		 _type == 'block' => {
					...,
		  		},
				_type == 'image' => { 
					'_type': 'image',
					'src': asset->url,
					'alt': asset->altText,
				},
			}, 
		}
	`;

	const portfolio: Portfolio = await fetch(`
		*[_type == 'portfolio'][0] {
			artist[] {
				${portfolioGROQ}
			},
			writer[] {
				${portfolioGROQ}
			},
	  	}
	`);

	const allData: AllData = {
		bioPage,
		resume: resume?.resume,
		portfolio: {
			artist: portfolio.artist || [],
			writer: portfolio.writer || [],
		},
	};

	return allData;
};

export default getAllData;