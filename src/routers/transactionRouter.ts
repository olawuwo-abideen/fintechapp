import express, { Request, Response } from 'express';
import { Auth, validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/transactionValidator';
import TransactionController from '../controllers/transactionController';

import { container } from 'tsyringe';


const router = express.Router();

const transactionController = container.resolve(TransactionController)

const createTransactionRoute = () => {


  router.post('/initiate-deposit', validator(ValidationSchema.initiatePaystackDeposit), Auth(), (req: Request, res: Response) => {
    return transactionController.initiatePaystackDeposit(req, res);
  });

  router.post("/verify-deposit", validator(ValidationSchema.verifyPaystackDeposit),Auth() , (req: Request, res: Response) => {
    return transactionController.verifyPaystackDeposit(req, res);
  });

  router.post("/transfer", validator(ValidationSchema.makeInternalTransferSchema), Auth(), (req: Request, res: Response) => {
    return transactionController.internalTransfer(req, res);
  });


  router.post("/withdrawal", validator(ValidationSchema.makeWithdrawalByPaystack), Auth(), (req: Request, res: Response) => {
    return transactionController.withdrawByPaystack(req, res);
  });

  router.get("/transactions", Auth(), (req: Request, res: Response) => {
    return transactionController.getAllUserTransactions(req, res);
  });

  router.get("transaction/:id", Auth(), (req: Request, res: Response) => {
    return transactionController.getUserTransaction(req, res);
  });

  return router;
};

export default createTransactionRoute();
