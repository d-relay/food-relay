import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Location {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id: number;
    @Column({ type: 'point', nullable: true }) geography: string;

    @Column({ type: 'character varying', length: 255, nullable: true }) country: string;
    @Column({ type: 'character varying', length: 255, nullable: true }) region: string;
    @Column({ type: 'character varying', length: 255, nullable: true }) street: string;
    @Column({ type: 'character varying', length: 255, nullable: true }) city: string;

    @Column({ type: 'character varying', length: 4, nullable: true }) house: string;
    @Column({ type: 'character varying', length: 4, nullable: true }) corps: string;

    @Column({ type: 'character varying', length: 4, nullable: true }) entrance: string;
    @Column({ type: 'character varying', length: 4, nullable: true }) floor: string;
    @Column({ type: 'character varying', length: 4, nullable: true }) flat: string;

    @OneToOne(_type => User)
    @JoinColumn() user: User;
}
