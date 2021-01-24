import {
	Entity, PrimaryGeneratedColumn, Column
	//  OneToOne, JoinColumn
} from 'typeorm'
// import { Image } from './Image'

@Entity()
export class Partner {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id: number;

    @Column({ type: 'character varying', length: 20 }) name: string;
    @Column({ type: 'smallint', default: 400 }) min_limit: number;

	// @OneToOne(() => Image)
	// @JoinColumn({ name: '' })
	// photo: Image
}
