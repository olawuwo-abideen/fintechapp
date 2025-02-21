import express, { Request, Response } from 'express';
import UserController from '../controllers/userController';
import { AdminAuth, validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/userValidator';
import AccountValidationSchema from '../validators/accountValidator';
import { container } from 'tsyringe';
import AccountController from '../controllers/accountController';
import TransactionController from '../controllers/transactionController';

const router = express.Router();
const userController = container.resolve(UserController);
const accountController = container.resolve(AccountController);
const transactionController = container.resolve(TransactionController);

/**
 * @swagger
 * tags:
 *   name: Admin
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/users', AdminAuth(), (req: Request, res: Response) => {
    return userController.getAllUsersByAdmin(req, res);
});

/**
 * @swagger
 * /admin/user/{id}:
 *   get:
 *     summary: Get a single user by ID (Admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */
router.get('/user/:id', AdminAuth(), (req: Request, res: Response) => {
    return userController.getSingleUserById(req, res);
});

/**
 * @swagger
 * /admin/user/status:
 *   post:
 *     summary: Update user account status (Admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               userId: "user_123"
 *               status: "ACTIVE"
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/status', validator(ValidationSchema.setAccountStatusSchema), AdminAuth(), (req: Request, res: Response) => {
    return userController.setAccountStatus(req, res);
});

/**
 * @swagger
 * /admin/accounts:
 *   get:
 *     summary: Get all user accounts (Admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User accounts retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', AdminAuth(), (req: Request, res: Response) => {
    return accountController.getAllUserAccountsAdmin(req, res);
});

/**
 * @swagger
 * /admin/account/{id}:
 *   get:
 *     summary: Get a user's account by ID (Admin only)
 *     tags: [Admin]
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
router.get('/account/:id', AdminAuth(), (req: Request, res: Response) => {
    return accountController.getUserAccountAdmin(req, res);
});

/**
 * @swagger
 * /admin/transactions:
 *   get:
 *     summary: Get all user transactions (Admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/transactions', AdminAuth(), (req: Request, res: Response) => {
    return transactionController.getAllUserTransactionsAdmin(req, res);
});

/**
 * @swagger
 * /admin/loans:
 *   get:
 *     summary: Get all loan applications (Admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Loan applications retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/loans', AdminAuth(), (req: Request, res: Response) => {
    return accountController.getLoansAdmin(req, res);
});

/**
 * @swagger
 * /admin/loans/status:
 *   post:
 *     summary: Approve or decline a loan (Admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loanId:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               loanId: "loan_789"
 *               status: "APPROVED"
 *     responses:
 *       200:
 *         description: Loan status updated successfully
 *       400:
 *         description: Invalid loan ID or status
 */
router.post('/loans/status', validator(AccountValidationSchema.approveOrDeclineLoanSchema), AdminAuth(), (req: Request, res: Response) => {
    return accountController.approveOrDeclineLoanByAdmin(req, res);
});

export default router;
