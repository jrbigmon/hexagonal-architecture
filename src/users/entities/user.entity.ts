export class User {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public email: string,
    public password?: string,
    public id?: number,
  ) {}

  get fullName(): string {
    return `${this.name} ${this.lastName}`;
  }
}
