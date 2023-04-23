import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Post } from "./post.entity";

@Entity('topics')
export class Topic {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Post, post => post.topic)
    posts: Post[]
}
