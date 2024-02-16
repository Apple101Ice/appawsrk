import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mall {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly name: string;

    @Column()
    readonly location: string;

    @Column()
    readonly description: string;
}
