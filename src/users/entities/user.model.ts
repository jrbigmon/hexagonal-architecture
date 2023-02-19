import {
  Column,
  CreatedAt,
  DeletedAt,
  Table,
  UpdatedAt,
  Model,
} from 'sequelize-typescript';

@Table({ tableName: 'users', paranoid: true, freezeTableName: true })
export class UserModel extends Model<UserModel> {
  @Column({ primaryKey: true, autoIncrement: true })
  id?: number;

  @Column
  name: string;

  @Column
  lastName: string;

  @Column
  age: number;

  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  get fullName(): string {
    return `${this.name} ${this.lastName}`;
  }
}
