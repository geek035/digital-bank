import { IUserData } from 'src/app/interfaces/mybank/user-data.interface';
import { IProductModel } from '../../../interfaces/mybank/product-model.interface';

export interface ICardOrderModel {
  id: number;
  client: IUserData;
  cardProgram: string;
  product: IProductModel;
  requestId: number;
  state: CardOrderState;
}

type CardOrderState =
  | 'Created'
  | 'BeingProduced'
  | 'Produced'
  | 'Delivery'
  | 'Delivered'
  | 'Issued'
  | 'Rejected';
