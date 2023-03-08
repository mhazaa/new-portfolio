import dotenv from 'dotenv';
import https from 'https';
import { AllData } from '../../types';

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
				resolve(body.result);
			});
		});

		request.on('error', (error) => {
			reject(error);
		});

		request.end();
	});
};

export default fetchAllData;