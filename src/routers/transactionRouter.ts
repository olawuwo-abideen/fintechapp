import express, { Request, Response } from 'express';
import { Auth, validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/transactionValidator';
import TransactionController from '../controllers/transactionController';
import { container } from 'tsyringe';

const router = express.Router();
const transactionController = container.resolve(TransactionController);

/**
 * @swagger
 * tags:
 *   name: Transactions
 */

/**
 * @swagger
 * /transactions/initiate-deposit:
 *   post:
 *     summary: Initiate a deposit via Paystack
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accoundId:
 *                 type: string
 *               amount:
 *                 type: number
 *             example:
 *               accountId: "accountid_123"
 *               amount: 50000
 *     responses:
 *       200:
 *         description: Deposit initiated successfully
 *       400:
 *         description: Bad request
 */
router.post('/transactions/initiate-deposit', validator(ValidationSchema.initiatePaystackDeposit), Auth(), (req: Request, res: Response) =>
  transactionController.initiatePaystackDeposit(req, res)
);

/**
 * @swagger
 * /transactions/verify-deposit:
 *   post:
 *     summary: Verify a deposit transaction
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference:
 *                 type: string
 *             example:
 *               reference: "ref_123456"
 *     responses:
 *       200:
 *         description: Deposit verified successfully
 *       400:
 *         description: Invalid transaction reference
 */
router.post('/transactions/verify-deposit', validator(ValidationSchema.verifyPaystackDeposit), Auth(), (req: Request, res: Response) =>
  transactionController.verifyPaystackDeposit(req, res)
);

/**
 * @swagger
 * /transactions/transfer:
 *   post:
 *     summary: Perform an internal transfer
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderAccountId:
 *                 type: string
 *               recieverAccountNumber:
 *                 type: number
 *             amount:
 *                 type: number
 *             example:
 *               senderAccountId: "012345678"
 *               recieverAccountNumber: "0987654"
 *               amount: 3000
 *     responses:
 *       200:
 *         description: Transfer successful
 *       400:
 *         description: Insufficient balance or invalid recipient
 */
router.post('/transactions/transfer', validator(ValidationSchema.makeInternalTransferSchema), Auth(), (req: Request, res: Response) =>
  transactionController.internalTransfer(req, res)
);

/**
 * @swagger
 * /transactions/withdrawal:
 *   post:
 *     summary: Withdraw funds via Paystack
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderAccountId:
 *                 type: string
 *               recieverAccountNumber:
 *                 type: string
 *             example:
 *               senderAccountId: "09876543"
 *               recieverAccountNumber: "1234567890"
 *               recieverAccountName: "Jane Doe"     
 *               bankCode: "044"
 *               amount: 5000
 *               message: "Pocket Money"           
 *     responses:
 *       200:
 *         description: Withdrawal initiated successfully
 *       400:
 *         description: Invalid account details
 */
router.post('/transactions/withdrawal', validator(ValidationSchema.makeWithdrawalByPaystack), Auth(), (req: Request, res: Response) =>
  transactionController.withdrawByPaystack(req, res)
);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retrieve all user transactions
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/transactions/', Auth(), (req: Request, res: Response) => {
  return transactionController.getAllUserTransactions(req, res);
});

/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Retrieve a specific transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details retrieved successfully
 *       404:
 *         description: Transaction not found
 */
router.get('/transaction/:id', Auth(), (req: Request, res: Response) => {
  return transactionController.getUserTransaction(req, res);
});

export default router;
