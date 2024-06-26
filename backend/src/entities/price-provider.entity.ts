import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Asset } from './asset.entity';
import { Ohlc } from './ohlc.class';

@Entity()
export class PriceProvider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string | null;

    @Column()
    minInterval: number;

    @Column()
    isVolumeIncluded: boolean;

    @OneToMany(() => Asset, asset => asset.priceProvider)
    assets: Asset[];

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;

    constructor(name: string, minInterval: number, isVolumeIncluded: boolean, description?: string) {
        this.name = name;
        this.minInterval = minInterval;
        this.isVolumeIncluded = isVolumeIncluded;
        this.description = description || null;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }

    getPrice(string: string): Ohlc {
        //
        throw new Error('Not implemented');
    }
}
