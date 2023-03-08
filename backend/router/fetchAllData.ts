import dotenv from 'dotenv';
import https from 'https';
import { Post, AllData } from '../../types';

dotenv.config();

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET;

const fetchAllData = (): Promise<AllData> => {
	const QUERY = encodeURIComponent('*[_type == "post"]');
	const URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${QUERY}`;

	return new Promise<AllData>((resolve, reject) => {
		const request = https.request(URL, (response) => {
			let data = '';

			response.on('data', (chunk) => {
				data = data + chunk.toString();
			});

			response.on('end', () => {
				const body = JSON.parse(data);
				
				const posts: Post[] = body.result.map((item: any) => {
					return {
						id: item.id,
						title: item.title,
						medium: item.medium,
						url: item.url,
						year: item.year,
						markup: item.markup,
					};
				});

				const allData: AllData = {
					socialMediaLinks: {
						instagram: 'https://www.instagram.com/magdi_hazaa/',
					},
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus sem, consectetur in odio sit amet, pharetra sodales libero. Pellentesque molestie mollis massa, sit amet ultricies eros vestibulum id. Phasellus sit amet semper velit, ut vulputate ipsum. Etiam dignissim eros ac lacinia tempor. Morbi eu libero commodo elit blandit pulvinar. Praesent nisl lacus, scelerisque in consequat a, lobortis laoreet lectus. Vivamus ultricies risus at sagittis ultrices. Nam et mi quis leo fringilla finibus.',
					portfolio: {
						artist: posts,
						writer: posts,
					},
				};

				resolve(allData);
			});
		});

		request.on('error', (error) => {
			reject(error);
		});

		request.end();
	});
};

export default fetchAllData;