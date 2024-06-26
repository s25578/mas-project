import {Controller, Get, Param} from '@nestjs/common';
import { MarketService } from '../../services/market.service';
import { Market } from '../../entities/market.entity';

@Controller('markets')
export class MarketController {
    constructor(private readonly marketService: MarketService) {}

    @Get()
    async getAllMarkets(): Promise<Market[]> {
        return await this.marketService.findAll();
    }

    @Get(':id/assets')
    async getMarketAssets(@Param('id') id: number): Promise<Market> {
        return await this.marketService.findMarketWithAssets(id);
    }
}