import { Request, Response } from 'express';
import { logger } from '../helpers/Logger';

import Author from '../models/Author';

const createAuthor = async (req: Request, res: Response) => {
	const { email, firstName, lastName, age, gender, address } = req.body;

	try {
		const newAuthor = new Author({
			email,
			firstName,
			lastName,
			age,
			gender,
			address,
		});

		const savedAuthor = await newAuthor.save();
		logger.success('Author Created Successfully');
		logger.info(savedAuthor);

		res.status(200).json({ author: savedAuthor });
	} catch (err: any) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

const getAllAuthors = async (req: Request, res: Response) => {
	try {
		const authors = await Author.find();

		logger.info(authors);

		res.status(200).json({ authors });
	} catch (err) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

const getAuthor = async (req: Request, res: Response) => {
	const authorId = req.params.authorId;

	try {
		const author = await Author.findById(authorId);

		if (author == null) {
			return res.status(403).json({ message: 'No such Author exists' });
		}

		logger.info(author);

		res.status(200).json({ author });
	} catch (err) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

const deleteAuthor = async (req: Request, res: Response) => {
	const authorId = req.params.authorId;

	try {
		const author = await Author.findById(authorId);

		if (author == null) {
			return res.status(403).json({ message: 'No such Author exists' });
		}

		logger.success('Author Deleted Successfully');

		await author.deleteOne();
		res.status(200).json({ message: 'Author Deleted Successfully' });
	} catch (err) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

export default {
	createAuthor,
	getAllAuthors,
	getAuthor,
	deleteAuthor,
};
