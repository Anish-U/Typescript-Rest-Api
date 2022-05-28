import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || '';

const MONGO_URI: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.um44v.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT: Number = process.env.SERVER_PORT
	? Number(process.env.SERVER_PORT)
	: 5000;

export const config = {
	mongo: {
		uri: MONGO_URI,
	},
	server: {
		port: SERVER_PORT,
	},
};
