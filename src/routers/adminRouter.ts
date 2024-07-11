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
const accountController = container.resolve(AccountController)
const transactionController = container.resolve(TransactionController);

const createAdminRoute = () => {
    router.get('/users', AdminAuth(), (req: Request, res: Response) => {
        return userController.getAllUsersByAdmin(req, res);
    });

    router.get('/user/:id', AdminAuth(), (req: Request, res: Response) => {
        return userController.getSingleUserById(req, res);
    });

    router.post('/user/status', validator(ValidationSchema.setAccountStatusSchema), AdminAuth(), (req: Request, res: Response) => {
        return userController.setAccountStatus(req, res);
    });

    router.get("/accounts", AdminAuth(), (req: Request, res: Response) => {
        return accountController.getAllUserAccountsAdmin(req, res);
    });


    router.get("/account/:id", AdminAuth(), (req: Request, res: Response) => {
        return accountController.getUserAccountAdmin(req, res);
    });

    router.get("/transactions", AdminAuth(), (req: Request, res: Response) => {
        return transactionController.getAllUserTransactionsAdmin(req, res);
    });

    router.get("/loans", AdminAuth(), (req: Request, res: Response) => {
        return accountController.getLoansAdmin(req, res);
    });


    router.post('/loans/status', validator(AccountValidationSchema.approveOrDeclineLoanSchema), AdminAuth(), (req: Request, res: Response) => {
        return accountController.approveOrDeclineLoanByAdmin(req, res);
    });

    return router;
}

export default createAdminRoute();