import { Collection } from '@mhazaa/mongo-controller';
import { Comment } from '../../types';

export const sendLike = async (collection: Collection, postId: string) => {
	await collection.mongoCollection.updateOne(
		{ postId },
		{ $inc: { likes: 1 } }
	);
	return await collection.mongoCollection.findOne({ postId });
};

export const sendComment = async (collection: Collection, postId: string, comment: Comment) => {
	await collection.mongoCollection.updateOne(
		{ postId },
		{ $push: { comments: comment } }
	);
	return await collection.mongoCollection.findOne({ postId });
};