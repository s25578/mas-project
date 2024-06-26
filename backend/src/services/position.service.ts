import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenedPosition } from '../entities/opened-position.entity';
import { ClosedPosition } from '../entities/closed-position.entity';
import {Position} from "../entities/position.entity";
import {PositionType} from "../enums/position-type.enum";
import {Account} from "../entities/account.entity";
import {Trader} from "../entities/trader.entity";
import {AccountService} from "./account.service";
import {AssetService} from "./asset.service";

@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(OpenedPosition)
        private readonly openedPositionRepository: Repository<OpenedPosition>,
        @InjectRepository(ClosedPosition)
        private readonly closedPositionRepository: Repository<ClosedPosition>,
        private readonly accountService: AccountService,
        private readonly assetService: AssetService,
    ) {}

    async findAll(): Promise<(OpenedPosition | ClosedPosition)[]> {
        const openedPositions = await this.openedPositionRepository.find({relations: ['asset']});
        const closedPositions = await this.closedPositionRepository.find();
        return [...openedPositions, ...closedPositions];
    }

    async findOne(id: string): Promise<OpenedPosition | ClosedPosition> {
        let oPosition = await this.openedPositionRepository.findOne({ where: { id } });
        if (oPosition) {
            return oPosition;
        }

        let cPosition = await this.closedPositionRepository.findOne({ where: { id } });
        if (!cPosition) {
            return cPosition;
        }

        throw new NotFoundException('Position not found');
    }

    async create(openedPosition: any): Promise<OpenedPosition> {

        console.log('account', this.accountService.findOne(openedPosition.account.id));
        console.log('asset', this.assetService.findOneByName(openedPosition.asset));

        const position = new OpenedPosition(
            openedPosition.direction,
            openedPosition.size,
            openedPosition.leverage,
            openedPosition.openPrice,
            openedPosition.fee,
            openedPosition.type as PositionType,
            await this.accountService.findOne(openedPosition.account.id),
            await this.assetService.findOneByName(openedPosition.asset)
        );
        return this.openedPositionRepository.save(position);
    }

    async update(id: string, openedPosition: OpenedPosition): Promise<OpenedPosition> {
        await this.openedPositionRepository.update(id, openedPosition);
        return this.openedPositionRepository.findOne({ where: { id } });
    }

    // async cancel(id: string): Promise<ClosedPosition> {
    //     const openedPosition = await this.openedPositionRepository.findOne({ where: { id } });
    //     if (!openedPosition) {
    //         throw new Error('Opened position not found');
    //     }
    //
    //     await this.openedPositionRepository.delete(id);
    //
    //     const closedPosition = new ClosedPosition(
    //         openedPosition.direction,
    //         openedPosition.size,
    //         openedPosition.leverage,
    //         openedPosition.openPrice,
    //         openedPosition.fee,
    //         openedPosition.type as PositionType,
    //         Date.now(),
    //         new Account(new Trader(3, 'John Doe', 'test@test.me', 'test123', 'US', 1, 100, 10000, 1234567890), false)
    //     );
    //
    //     return this.closedPositionRepository.save(closedPosition);
    // }
}
