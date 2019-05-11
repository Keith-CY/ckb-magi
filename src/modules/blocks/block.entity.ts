import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  hash: string;

  @Column()
  number: string;
  @Column()
  timestamp: string;
}
