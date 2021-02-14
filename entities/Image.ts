import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Image {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id: number;
    @Column({ type: 'character varying', default: '', length: 50 }) filename: string;

    @Column() imageableId: number;

    @Column() imageableType: 'alert' | 'partner';
}
