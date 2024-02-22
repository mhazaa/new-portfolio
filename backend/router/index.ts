import { resolve } from 'path';
import { Application } from 'express';
import { Collection } from '@mhazaa/mongo-controller';
import getAllData from '../sanityControls/getAllData';
import { AllData, PostContactFormData } from '../../types';

interface Collections {
	contactFormsCollection: Collection;
}

export default (app: Application, collections: Collections): void => {
	const { contactFormsCollection } = collections;

	app.get('/get-all-data', async (_req, res) => {
		try {
			const allData: AllData = await getAllData();
			console.log(allData);
			res.status(200).send(allData);
		} catch (error) {
			console.error(error);
			return res.status(400).send(error);
		}
	});

	app.get('*', (_req, res) => {
		res.sendFile(resolve('../frontend/build/index.html'));
	});

	app.post('/post-contact-form', async (req, res) => {
		try {
			const reqData: PostContactFormData = req.body;
			console.log(reqData);

			const resData = await contactFormsCollection.insertOne(reqData);
			console.log(resData);
			res.status(200).send(resData);
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	});
};