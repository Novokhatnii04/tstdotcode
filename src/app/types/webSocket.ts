export interface ICreateWebSocket {
  socketUrl: string;
  onOpen: (data: any) => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
}

export interface Transaction {
  hash: string;
  value: number;
}

export interface ICryptoTransactionsUI {
  transactions: Transaction[];
  start: () => void;
  stop: () => void;
  reset: () => void;
  totalValue: number;
}
