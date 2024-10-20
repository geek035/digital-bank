export interface IStartOperation {
  operationCode:
    | 'AccountOpen'
    | 'AccountRefill'
    | 'AccountTransfer'
    | 'CardOrder',
}
