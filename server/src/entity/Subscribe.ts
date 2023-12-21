import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

// 알쓸개솔-서버 구독 테이블 엔티티
@Entity("subscribe")
export class Subscribe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: "datetime", nullable: true })
  expirationTime: Date;

  @Column()
  p256Key: string;

  @Column()
  authKey: string;

  @Column()
  endpoint: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
