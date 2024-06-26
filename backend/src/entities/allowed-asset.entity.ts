import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique} from 'typeorm';
import { Trader } from './trader.entity';
import { Asset } from './asset.entity';

@Entity()
@Unique(['trader', 'asset'])
export class AllowedAsset {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Trader, trader => trader.allowedAssets)
    trader: Trader;

    @ManyToOne(() => Asset, asset => asset.allowedAssets)
    asset: Asset;

    @Column('decimal')
    fee: number;

    @Column({ type: 'bigint' })
    createdAt: number;

    @Column({ type: 'bigint' })
    updatedAt: number;

    constructor(trader: Trader, asset: Asset, fee: number) {
        this.trader = trader;
        this.asset = asset;
        this.fee = fee;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
}
