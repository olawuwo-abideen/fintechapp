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
