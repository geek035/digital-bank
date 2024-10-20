import { IUserData } from "src/app/interfaces/mybank/user-data.interface"
import { IProductModel } from "../../../interfaces/mybank/product-model.interface"

export interface ICardModel {
    id: number,
    account: ICardAccountModel,
    client: IUserData,
    cardProgram: string,
    product: IProductModel,
    number: string,
    month: string,
    year: string,
    pinRequired: boolean,
    state: CardState,
}

export type CardState = 'Created' | 'Active' | 'Locked' | 'Expired' | 'Blocked';

export interface ICardAccountModel {
    id: number,
    createdDate: Date,
    currency: number,
    number: string,
    name: string,
    balance: number,
    state: 'Created' | 'Blocked' | 'Active'
}
