import { resolve } from 'path';
import { Application } from 'express';
import { Collection } from '@mhazaa/mongo-controller';
import getAllData from '../sanityControls/getAllData';
import { AllData, PostContactFormData, PostLikeData, PostCommentData } from '../../types';

interface Collections {
	postsCollection: Collection;
	contactFormsCollection: Collection;
}

export default (app: Application, collections: Collections): void => {
	const { postsCollection, contactFormsCollection } = collections;

	app.get('/get-all-data', async (_req, res) => {
		try {
			//const allDocuments = await postsCollection.getAllDocuments();
			//console.log(allDocuments); //as AllData?
			
			const allData: AllData = await getAllData();
			console.log(allData);
			res.status(200).send(allData);
		} catch (error) {
			console.log('error');
			console.log(error);
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

	app.post('/post-like', async (req, res) => {
		try {
			const reqData: PostLikeData = req.body;
			console.log(reqData);

			const { userId, postId } = reqData;
			const resData = await postsCollection.createOrUpdateDocument(
				{ postId },
				{ $inc: { likes: 1 } }
			);
			console.log(resData);
			res.status(200).send(resData);
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	});

	app.post('/post-comment', async (req, res) => {
		try {
			const reqData: PostCommentData = req.body;
			console.log(reqData);

			const { userId, postId, comment } = reqData;
			const resData = await postsCollection.createOrUpdateDocument(
				{ postId },
				{ $push: { comments: comment } }
			);
			console.log(resData);
			res.status(200).send(resData);
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	});
};