import {Entity, Column, ChildEntity} from 'typeorm';
import { Position } from './position.entity';
import {PositionType} from "../enums/position-type.enum";
import {Account} from "./account.entity";
import {Asset} from "./asset.entity";
@ChildEntity()
export class OpenedPosition extends Position {
    @Column({ default: 0 })
    postponeFeeRate: number;

    constructor(
        direction: string,
        size: number,
        leverage: number,
        openPrice: number,
        fee: number,
        type: PositionType,
        account: Account,
        asset: Asset,
        postponeFeeRate?: number
    ) {
        super(direction, size, leverage, openPrice, fee, type, account, asset);

        if (!this.isAssetUnique(asset)) {
            throw new Error("Unique asset constraint violated");
        }

        if (!this.isLeverageAllowed(leverage)) {
            throw new Error("Leverage is too big");
        }

        this.postponeFeeRate = postponeFeeRate || 0;
    }

    isLeverageAllowed(leverage: number): boolean {
        //return this.account.trader.maxLeverage < leverage;
        return true;
    }

    isAssetUnique(asset: Asset): boolean {
        // implement
        return true;
    }

    getPostponeFee(): number {
        // 
        return 0;
    }

    execute(): void {
        //
    }

    cancel(): void {
        //
    }

    updatePrice(price: number): void {
        //
    }

    updateLeverage(leverage: number): void {
        //
    }

    updateSize(size: number): void {
        //
    }

    getPnL(): number {
        //
        return 0;
    }

    getDuration(): number {
        //
        return 0;
    }
}