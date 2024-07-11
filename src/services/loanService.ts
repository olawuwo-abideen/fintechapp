import { autoInjectable } from "tsyringe";
import { IFindLoanQuery, ILoan, ILoanCreationBody } from "../interfaces/loanInterface";
import { LoanStatus } from "../interfaces/enum/loanEnum"
import LoanDataSource from "../datasource/loanDataSource";

@autoInjectable()
class LoanService {
  private LoanDataSource: LoanDataSource;

  constructor(_LoanDataSource: LoanDataSource) {
    this.LoanDataSource = _LoanDataSource;
  }

  async getLoanByField(record: Partial<ILoan>): Promise<ILoan | null> {
    const query = { where: { ...record }, raw: true } as IFindLoanQuery;
    return this.LoanDataSource.fetchOne(query);
  }


  async createLoan(data: Partial<ILoanCreationBody>): Promise<ILoan> {
    const record = {
      ...data,
      status: LoanStatus.PENDING,
    } as ILoanCreationBody;
    return this.LoanDataSource.create(record);
  }


  async getLoansByUserId(userId: keyof ILoan): Promise<ILoan[]> {
    const query = { where: { userId }, raw: true };
    return this.LoanDataSource.fetchAll(query);
  }

  async getLoans(): Promise<ILoan[]> {
    const query = { where: {}, raw: true };
    return this.LoanDataSource.fetchAll(query);
  }


  async updateRecord(searchBy: Partial<ILoan>, record: Partial<ILoan>): Promise<void> {
    const query = { where: { ...searchBy } } as IFindLoanQuery;
    await this.LoanDataSource.updateOne(record, query);
  }


}

export default LoanService;
