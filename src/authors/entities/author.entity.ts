/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 20 })
    name: string;

    @Column({ length: 20 })
    email: string;

    @Column()
    country: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
