import express, { Request, Response, NextFunction, Router } from 'express';

import authorController from '../controllers/authorController';

const router: Router = express.Router();

router.post('/', authorController.createAuthor);
router.get('/:authorId', authorController.getAuthor);
router.get('/', authorController.getAllAuthors);
router.delete('/:authorId', authorController.deleteAuthor);

export default router;
