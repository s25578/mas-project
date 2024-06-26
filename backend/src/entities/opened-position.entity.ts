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
        this.postponeFeeRate = postponeFeeRate || 0;
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