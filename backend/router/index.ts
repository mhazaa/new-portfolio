import { resolve } from 'path';
import { Application } from 'express';
import { Collection } from '@mhazaa/mongo-controller';
import getAllData from '../sanityControls/getAllData';
import mailer from '../mailer';
import { AllData, PostContactFormData } from '../../types';

interface Collections {
	contactFormsCollection: Collection;
}

export default (app: Application, collections: Collections): void => {
	const { contactFormsCollection } = collections;

	app.get('/get-all-data', async (_req, res) => {
		try {
			const allData: AllData = await getAllData();
			console.log('allData', allData);
			res.status(200).send(allData);
		} catch (error) {
			console.error(error);
			res.status(400).send(error);
		};
	});

	app.get('*', (_req, res) => {
		res.sendFile(resolve('../frontend/build/index.html'));
	});

	app.post('/post-contact-form', async (req, res) => {
		try {
			const requestData: PostContactFormData = req.body;
			console.log('postContactFormRequestData', requestData);

			const mailerResponseData = await mailer(requestData);
			const mongoResponseData = await contactFormsCollection.insertOne(requestData);
			const responeData = {
				mailerResponseData,
				mongoResponseData,
			};
			console.log('postContactFormResponseData', responeData);
			res.status(200).send(responeData);
		} catch (error) {
			console.log(error);
			res.status(400).send(error);
		};
	});
};