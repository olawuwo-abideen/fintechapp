import express, { Request, Response } from 'express';
import { Auth , validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/accountValidator';
import AccountController from '../controllers/accountController';
import { container } from 'tsyringe';


const router = express.Router();
const accountController = container.resolve(AccountController)

const createAccountRoute = () => {


  router.post('/create-account', validator(ValidationSchema.createAccountSchema), Auth(), (req: Request, res: Response) => {
    return accountController.createAccount(req, res);
  });


/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

 /**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
  */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
  router.get('/accounts', Auth(), (req: Request, res: Response) => {
    return accountController.getAllUserAccounts(req, res);
  });
 

  router.get('account/:id', Auth(), (req: Request, res: Response) => {
    return accountController.getUserAccount(req, res);
  });

  router.get("/payee/list", Auth(), (req: Request, res: Response) => {
    return accountController.getAllUserPayee(req, res);
  });


  router.get("/payee/:id", Auth(), (req: Request, res: Response) => {
    return accountController.getUserPayee(req, res);
  });

  router.post("/loan-appilcation", validator(ValidationSchema.loanApplication), Auth(), (req: Request, res: Response) => {
    return accountController.applyLoan(req, res);
  });

  router.get("/loan/list", Auth(), (req: Request, res: Response) => {
    return accountController.getAllUserLoan(req, res);
  });

  return router;
};

export default createAccountRoute();
