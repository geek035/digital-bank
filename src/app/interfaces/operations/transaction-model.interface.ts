import { IAccountModel } from "../mybank/account-model.interace";

export interface ITransactionModel {
    id: number,
    account: IAccountModel,
    receiver: string,
    date: string,
    paymentDate: string,
    amount: number,
    comment: string,
    reason: string,
    state: TransactionState,
    type: TransactionType,
}


export type TransactionState = 'Hold' | 'Completed' | 'Canceled';
export type TransactionType = 'Income' | 'Expense' | 'Active';