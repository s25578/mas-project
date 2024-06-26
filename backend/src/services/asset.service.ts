import {Injectable, NotFoundException} from '@nestjs/common';
import { Asset } from '../entities/asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Account} from "../entities/account.entity";

@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(Asset)
        private readonly assetRepository: Repository<Asset>,
    ) {}

    async findAll(): Promise<Asset[]> {
        return await this.assetRepository.find();
    }

    async findOne(id: string): Promise<Asset> {
        let asset = await this.assetRepository.findOne({ where: { id } });
        if (asset) {
            return asset;
        }
        throw new NotFoundException('Asset not found');
    }

    async findOneByName(name: string): Promise<Asset> {
        let asset = await this.assetRepository.findOne({ where: { name } });
        if (asset) {
            return asset;
        }
        throw new NotFoundException('Asset not found');
    }
}
