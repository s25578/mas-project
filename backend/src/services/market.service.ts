import { Injectable } from '@nestjs/common';
import { Market } from '../entities/market.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class MarketService {
    constructor(
        @InjectRepository(Market)
        private readonly marketRepository: Repository<Market>,
    ) {}

    async findAll(): Promise<Market[]> {
        return await this.marketRepository.find();
    }

    async findMarketWithAssets(marketId: number): Promise<Market> {
        return await this.marketRepository.findOne({
            where: { id: marketId },
            relations: ['assets'],
        });
    }
}
