import * as yup from 'yup';
import { AccountType } from '../interfaces/enum/accountEnum';

const createAccountSchema = yup.object({
  type: yup.string().trim().required().oneOf(Object.values(AccountType)),
  
});

const loanApplication = yup.object({
  accountId: yup.string().trim().required(),
  amount: yup.number().required(),
});

const approveOrDeclineLoanSchema = yup.object({
  loanId: yup.string().trim().required(),
  status: yup.string().required().oneOf(Object.values(["APPROVED","DECLINED"])),
});


const ValidationSchema = {
  createAccountSchema,
  loanApplication,
  approveOrDeclineLoanSchema
};

export default ValidationSchema;
