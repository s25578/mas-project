import { DataSource, Repository } from 'typeorm';
import { MarketProvider } from '../entities/market-provider.entity';

export class MarketProviderRepository extends Repository<MarketProvider> {
    constructor(dataSource: DataSource) {
        super(MarketProvider, dataSource.createEntityManager());
    }
}
