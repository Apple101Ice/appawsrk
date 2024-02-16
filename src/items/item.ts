import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    readonly price: number;

    @Column()
    readonly description: string;

    @Column()
    readonly image: string;
}
