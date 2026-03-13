export class Transaction {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  description?: string | null;
  financeId: string;

  constructor(props: Transaction) {
    Object.assign(this, props);
  }
}
