/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100 })
    title: string;

    @Column()
    body: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}

