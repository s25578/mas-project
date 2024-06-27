import {Controller, Get, Param} from '@nestjs/common';
import { MarketService } from '../../services/market.service';
import { Market } from '../../entities/market.entity';

@Controller('markets')
export class MarketController {
    constructor(private readonly marketService: MarketService) {}

    /**
     * Get all markets
     * GET /markets
     * @returns 
     */
    @Get()
    async getAllMarkets(): Promise<Market[]> {
        return await this.marketService.findAll();
    }

    /**
     * Get a market by ID
     * GET /markets/:id
     * @param id number - ID of the market
     * @returns
     */
    @Get(':id/assets')
    async getMarketAssets(@Param('id') id: number): Promise<Market> {
        return await this.marketService.findMarketWithAssets(id);
    }
}