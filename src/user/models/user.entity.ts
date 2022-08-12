import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_test_aksel_vazquez_eliosa' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true, length: 255 })
  secondName?: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ nullable: true, length: 255 })
  secondLastname?: string;

  @Column({ type: 'varchar', length: 120 })
  bornDate: string;

  @Column({ unique: false, type: 'text' })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;
}
