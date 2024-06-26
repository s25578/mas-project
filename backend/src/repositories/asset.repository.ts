import { DataSource, Repository } from 'typeorm';
import { Asset } from '../entities/asset.entity';

export class AssetRepository extends Repository<Asset> {
    constructor(dataSource: DataSource) {
        super(Asset, dataSource.createEntityManager());
    }
}
