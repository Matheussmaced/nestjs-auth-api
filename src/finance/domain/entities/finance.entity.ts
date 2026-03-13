export class Finance {
  id: string;
  userId: string;
  totalBalance: number;
  monthlyBalance: number;

  constructor(props: Finance) {
    Object.assign(this, props);
  }
}
