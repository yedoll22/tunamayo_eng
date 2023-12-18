import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Comment } from "./Comment";
import { Like } from "./Like";
import { Report } from "./Report";
import { Subscribe } from "./Subscribe";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  isAdmin: boolean;

  @Column()
  oAuthProvider: string;

  @Column({ unique: true })
  oAuthProviderId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.userId)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.userId)
  likes: Like[];

  @OneToMany(() => Report, (report) => report.userId)
  reports: Report[];

  @OneToMany(() => Subscribe, (subscribe) => subscribe.userId)
  subscribes: Subscribe[];
}
