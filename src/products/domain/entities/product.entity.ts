export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public completed: boolean,
    public clientId: string,
  ) {}

  markAsCompleted() {
    this.completed = true;
  }
}
