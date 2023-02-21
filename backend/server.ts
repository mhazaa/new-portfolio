import dotenv from 'dotenv';
import express from 'express';
import helmet from  'helmet';
import { resolve } from 'path';
import AnalyticsEngine from '@mhazaa/analytics-engine';
import DB, { Config } from '@mhazaa/mongo-controller';
import router from './router';

dotenv.config();
const PORT = 80;
const app: express.Application = express();
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));

app.use(helmet());
app.use(express.json());
app.use(express.static(resolve('../frontend/build')));

const config: Config = {
	DBUSERNAME: process.env.DBUSERNAME || '',
	DBPASSWORD: process.env.DBPASSWORD || '',
	DBNAME: process.env.DBNAME || '',
	DBCLUSTERNAME: process.env.DBCLUSTERNAME || '',
	DBCLUSTERID: process.env.DBCLUSTERID || '',
};

const start = async () => {
	const db = new DB(config);
	await db.connect();

	const analyticsCollection = db.collection(process.env.ANALYTICS_COLLECTION || 'analytics');
	const postsCollection = db.collection(process.env.POSTS_COLLECTION || 'posts');
	
	AnalyticsEngine.connectUsingCollection(analyticsCollection);
	AnalyticsEngine.routes(app);
	
	router(app, { postsCollection });
};

start();