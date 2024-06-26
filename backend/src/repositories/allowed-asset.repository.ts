import { DataSource, Repository } from 'typeorm';
import { AllowedAsset } from '../entities/allowed-asset.entity';

export class AllowedAssetRepository extends Repository<AllowedAsset> {
    constructor(dataSource: DataSource) {
        super(AllowedAsset, dataSource.createEntityManager());
    }
}
