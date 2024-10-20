export interface IOperationInfo {
  clientId: number;
  isConfirmed: boolean;
  isFinished: boolean;
  name: string;
  operationCode:
    | 'AccountOpen'
    | 'AccountRefill'
    | 'AccountTransfer'
    | 'CardOrder';
  requestId: number;
  startDate: Date;
  stepId: number;
  stepParams: IStepParam[];
}

interface IStepParam {
  identifier: string;
  value: string;
  name: string;
  requirements: {
    mask: string;
    max: number;
    min: number;
    required: boolean;
  };
  type: string;
  values: string[];
}
