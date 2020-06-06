import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id!: number;
    @Column({ type: "point", nullable: false }) geography!: string;
    @Column({ type: "integer", nullable: false }) zipcode!: number;
    @Column({ type: "character varying", length: 255, nullable: false }) country!: string;
    @Column({ type: "character varying", length: 255, nullable: false }) region!: string;
    @Column({ type: "character varying", length: 255, nullable: false }) city!: string;
}