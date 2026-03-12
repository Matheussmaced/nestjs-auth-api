export class Client {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public userId: string,
    public active: boolean = true,
  ) {}

  deactivate() {
    this.active = false;
  }
}
