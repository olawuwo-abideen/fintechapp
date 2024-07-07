import { FindOptions } from 'sequelize';
import { IFindPayeeQuery, IPayee, IPayeeCreationBody, IPayeeDataSource } from '../interfaces/payeeInterface';
import PayeeModel from '../models/payeeModel';

class PayeeDataSource implements IPayeeDataSource {
  async create(record: IPayeeCreationBody): Promise<IPayee> {
    return await PayeeModel.create(record);
  }

  async fetchOne(query: IFindPayeeQuery): Promise<IPayee | null> {
    return await PayeeModel.findOne(query);
  }

  async fetchAll(query: FindOptions<IPayee>): Promise<IPayee[]> {
    return await PayeeModel.findAll(query)
  }

  async updateOne(data: Partial<IPayee> , query: IFindPayeeQuery) : Promise<void>{
    await PayeeModel.update(data , query);
  }

}

export default PayeeDataSource;
