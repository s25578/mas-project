import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { Market } from './market.entity';
import { PriceProvider } from './price-provider.entity';
import { MarketProvider } from './market-provider.entity';
import { Ohlc } from './ohlc.class';
import { AllowedAsset } from './allowed-asset.entity';
import {Position} from "./position.entity";
import {AssetStatus} from "../enums/asset-status.enum";

@Entity()
export class Asset {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column("simple-array")
    tags: string[];

    @Column({ nullable: true })
    description: string | null;

    @Column({ default: AssetStatus.ACTIVE })
    status: string; //AssetStatus

    @ManyToOne(() => Market, market => market.assets)
    market: Market;

    @ManyToOne(() => PriceProvider, priceProvider => priceProvider.assets)
    priceProvider: PriceProvider;

    @ManyToOne(() => MarketProvider, marketProvider => marketProvider.assets)
    marketProvider: MarketProvider;

    @OneToMany(() => AllowedAsset, allowedAsset => allowedAsset.asset)
    allowedAssets: AllowedAsset[];

    @OneToMany(() => Position, position => position.asset)
    positions: Position[];

    constructor(name: string, tag: string[], status: AssetStatus, market: Market, priceProvider: PriceProvider, marketProvider: MarketProvider, description?: string) {
        this.name = name;
        this.tags = tag;
        this.market = market;
        this.priceProvider = priceProvider;
        this.marketProvider = marketProvider;
        this.description = description || null;
        this.status = status || AssetStatus.ACTIVE;
    }

    getPrice(): Ohlc {
        //
        throw new Error('Not implemented');
    }

    getMarketDepth(number?: number): number {
        //
        return 0;
    }
}
