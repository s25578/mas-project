import { Controller, Get } from '@nestjs/common';
import { AssetService } from '../../services/asset.service';
import { Asset } from '../../entities/asset.entity';

@Controller('assets')
export class AssetController {
    constructor(private readonly assetService: AssetService) {}

    /**
     * Get all assets
     * GET /assets
     * @returns 
     */
    @Get()
    async getAllAssets(): Promise<Asset[]> {
        return await this.assetService.findAll();
    }
}
