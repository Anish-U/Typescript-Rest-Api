import mongoose from 'mongoose';

import { config } from './config';
import { logger } from '../helpers/Logger';

const mongoUri: string = config.mongo.uri;

const initDB = () => {
	// Connect to MongoDB
	mongoose.connect(mongoUri, () => {
		logger.success('MongoDB connection successful');
	});

	const db = mongoose.connection;

	// MongoDB Error Handling
	db.on('error', (error) => logger.error(`MongoDB error occurred : ${error}`));
};

export default initDB;
