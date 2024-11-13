import Db from './index';
import UserModel from '../models/userModel';
import TokenModel from '../models/tokenModel';
import TransactionModel from '../models/transactionModel';
import AccountModel from '../models/accountModel';
import PayeeModel from '../models/payeeModel';
import LoanModel from '../models/loanModel';

const DbInitialize = async () => {
  try {
    await Db.authenticate();
    UserModel.sync({ alter: false });
    TokenModel.sync({ alter: false });
    AccountModel.sync({alter:false});
    TransactionModel.sync({alter:false});
    PayeeModel.sync({alter:false})
    LoanModel.sync({alter:false,hooks:true})
  } catch (error) {
    console.log('Unable to connect to our database ', error);
  }
};

export default DbInitialize;
