import { FindOptions } from 'sequelize';
import { IFindLoanQuery, ILoan, ILoanCreationBody, ILoanDataSource } from '../interfaces/loanInterface';
import LoanModel from '../models/loanModel';

class LoanDataSource implements ILoanDataSource {
  async create(record: ILoanCreationBody): Promise<ILoan> {
    return await LoanModel.create(record);
  }

  async fetchOne(query: IFindLoanQuery): Promise<ILoan | null> {
    return await LoanModel.findOne(query);
  }

  async fetchAll(query: FindOptions<ILoan>): Promise<ILoan[]> {
    return await LoanModel.findAll(query)
  }

  async updateOne(data: Partial<ILoan> , query: IFindLoanQuery) : Promise<void>{
    await LoanModel.update(data , query);
  }

}

export default LoanDataSource;
