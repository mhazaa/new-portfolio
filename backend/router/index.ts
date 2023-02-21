import { resolve } from 'path';
import { Application } from 'express';
import { Collection } from '@mhazaa/mongo-controller';
import { sendLike, sendComment } from './dbFunctions';
import { LikeData, CommentData } from '../../types';

export default (app: Application, collections: {postsCollection: Collection}): void => {
	app.get('/fetch-data', async (_req, res) => {
		try {
			const allDocuments = await collections.postsCollection.getAllDocuments();
			console.log(allDocuments);
			res.status(200).send(allDocuments);
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
			const reqData: LikeData = req.body;
			const { postId } = reqData;
			const post = await sendLike(collections.postsCollection, postId);
			//const resData = await collections.postsCollection.insertOne(reqData);
			console.log(reqData);
			res.status(200).send(post);
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	});

	app.post('/comment', async (req, res) => {
		try {
			const reqData: CommentData = req.body;
			const { postId, comment } = reqData;
			const post = await sendComment(collections.postsCollection, postId, comment);
			//const resData = await collections.postsCollection.insertOne(reqData);
			console.log(reqData);
			res.status(200).send(post);
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	});
};