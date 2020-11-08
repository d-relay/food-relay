import { Entity, Generated, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";
import { Image } from "./Image.entity";

@Entity()
export class Alert {
    @Column() @Generated("uuid") alert_token: string;
    @PrimaryGeneratedColumn({ type: "bigint" }) id: number;

    @Column({ type: "character varying", length: 7, default: '#000000' }) color: string;

    @Column({ type: "smallint", default: 0 }) font_size: string;
    @Column({ type: "character varying", default: '', length: 50 }) message: string;

    @Column({ type: "smallint", default: 5 }) duration: number;
    @Column({ type: "smallint", default: 10 }) interval: number;

    @OneToOne(type => User)
    @JoinColumn() user: User;

    @OneToOne(type => Image)
    @JoinColumn() image: Image;
}