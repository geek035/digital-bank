import { IUserData } from "src/app/interfaces/mybank/user-data.interface";

export interface IAccountModel {
    id: number,
    client: IUserData,
    createDate: Date,
    currency: number,
    number: string,
    name: string,
    balance: number,
    state: AccountState,
}

type AccountState = 'Created' | 'Blocked' | 'Active';