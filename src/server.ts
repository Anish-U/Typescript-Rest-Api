import express, { Application, Request, Response, NextFunction } from 'express';

import { logger } from './helpers/Logger';
import { config } from './configs/config';
import initDB from './configs/database';

import authorRouter from './routes/authorRouter';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Response Logging
app.use((req: Request, res: Response, next: NextFunction) => {
	logger.info(
		`Incoming Request => Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
	);

	res.on('finish', () => {
		logger.info(
			`Outgoing Response => Method: [${req.method}] - Status: [${res.statusCode}]`
		);
	});

	next();
});

// API Rules
app.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With ,Content-Type, Accept, Authorization'
	);

	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
		return res.json({}).status(200);
	}

	next();
});

// Routes

app.use('/author', authorRouter);

// HealthCheck
app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
	logger.success('Server Working Properly');
	return res.status(200).json({ message: 'pong' });
});

// Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
	const error: Error = new Error('Not Found');
	logger.error(error);
	return res.status(404).json({ message: error.message });
});

// Serving and listening at Server Port
app.listen(config.server.port, () => {
	logger.success(`Backend server running at localhost:${config.server.port}`);
	initDB();
});
