import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

@Table
export class Watchlist extends Model {
  @ForeignKey(() => User)
  userId: User;

  @Column
  name: string;

  @Column
  assetId: string;
}
