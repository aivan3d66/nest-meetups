import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<User> {
  @ApiProperty({ description: 'User name', nullable: false })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;
  @ApiProperty({ description: 'User email', nullable: false })
  @Column({
    type: DataType.STRING,
    validate: { isEmail: true },
    allowNull: false,
  })
  email: string;
  @ApiProperty({ description: 'User password', nullable: false })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @ApiProperty({ description: 'User refresh_token', nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refresh_token: string;
  @ApiProperty({ description: 'User access roles', nullable: false })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    values: ['admin', 'user'],
    allowNull: false,
  })
  roles: string[];
}
