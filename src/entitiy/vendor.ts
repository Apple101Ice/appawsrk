import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendor {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly name: string;

    @Column()
    readonly mallId: number;

    @Column()
    readonly description: string;
}
