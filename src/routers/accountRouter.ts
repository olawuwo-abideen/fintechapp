import express, { Request, Response } from 'express';
import { Auth, validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/accountValidator';
import AccountController from '../controllers/accountController';
import { container } from 'tsyringe';

const router = express.Router();
const accountController = container.resolve(AccountController);

/**
 * @swagger
 * tags:
 *   name: Accounts
 */

/**
 * @swagger
 * /accounts/create-account:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AccountType:
 *                 type: string
 *               AccountStatus:
 *                 type: string
 *             example:
 *               AccountType: "SAVING_ACCOUNT"
 *               AccountStatus: "ACTIVE"
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/create-account', validator(ValidationSchema.createAccountSchema), Auth(), (req: Request, res: Response) => {
    return accountController.createAccount(req, res);
});

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all user accounts
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user accounts
 *       401:
 *         description: Unauthorized
 */
router.get('/', Auth(), (req: Request, res: Response) => {
    return accountController.getAllUserAccounts(req, res);
});

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get account details by ID
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account details retrieved successfully
 *       404:
 *         description: Account not found
 */
router.get('/:id', Auth(), (req: Request, res: Response) => {
    return accountController.getUserAccount(req, res);
});

/**
 * @swagger
 * /accounts/payee/list:
 *   get:
 *     summary: Get all payees 
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of payees
 *       401:
 *         description: Unauthorized
 */
router.get('/payee/list', Auth(), (req: Request, res: Response) => {
    return accountController.getAllUserPayee(req, res);
});

/**
 * @swagger
 * /accounts/payee/{id}:
 *   get:
 *     summary: Get payee details by ID
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payee ID
 *     responses:
 *       200:
 *         description: Payee details retrieved successfully
 *       404:
 *         description: Payee not found
 */
router.get('/payee/:id', Auth(), (req: Request, res: Response) => {
    return accountController.getUserPayee(req, res);
});

/**
 * @swagger
 * /accounts/loan-application:
 *   post:
 *     summary: Apply for a loan
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *             example:
 *               accountId: "account123455"
 *               amount: 5000
 *     responses:
 *       201:
 *         description: Loan application submitted successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/loan-application', validator(ValidationSchema.loanApplication), Auth(), (req: Request, res: Response) => {
    return accountController.applyLoan(req, res);
});

/**
 * @swagger
 * /accounts/loan/list:
 *   get:
 *     summary: Get all loan applications for the user
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of loan applications
 *       401:
 *         description: Unauthorized
 */
router.get('/loan/list', Auth(), (req: Request, res: Response) => {
    return accountController.getAllUserLoan(req, res);
});

export default router;
