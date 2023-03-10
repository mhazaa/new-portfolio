import { resolve } from 'path';
import { Application } from 'express';
import { Collection } from '@mhazaa/mongo-controller';
import { sendLike, sendComment } from './dbFunctions';
import fetchAllData from './fetchAllData';
import { AllData, LikePostData, CommentPostData } from '../../types';

interface Collections {
	analyticsCollection: Collection;
	postsCollection: Collection;
	contactFormsCollection: Collection;
}

export default (app: Application, collections: Collections): void => {
	const { analyticsCollection, postsCollection, contactFormsCollection } = collections;
	
	app.get('/fetch-all-data', async (_req, res) => {
		try {
			const allDocuments = await postsCollection.getAllDocuments();
			//console.log(allDocuments); //as AllData
			
			const allData: AllData = await fetchAllData();
			//console.log(allData);

			res.status(200).send(allData);
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	});

	app.get('*', (_req, res) => {
		res.sendFile(resolve('../frontend/build/index.html'));
	});

	app.post('/like', async (req, res) => {
		try {
			const reqData: LikePostData = req.body;
			const { postId } = reqData;
			const post = await sendLike(postsCollection, postId);
			//const resData = await postsCollection.insertOne(reqData);
			console.log(reqData);
			res.status(200).send(post);
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	});

	app.post('/comment', async (req, res) => {
		try {
			const reqData: CommentPostData = req.body;
			const { postId, comment } = reqData;
			const post = await sendComment(postsCollection, postId, comment);
			//const resData = await postsCollection.insertOne(reqData);
			console.log(reqData);
			res.status(200).send(post);
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	});
};