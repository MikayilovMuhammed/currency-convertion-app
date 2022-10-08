interface IInfo {
  rate: number;
  timestamp: number;
}
interface IQuery {
  amount: number | string;
  from: string;
  to: string;
}

export interface ICurrencyConverter {
  date: string;
  info: IInfo;
  query: IQuery;
  result: number;
  success: boolean;
}
