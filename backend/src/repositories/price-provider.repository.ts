import { DataSource, Repository } from 'typeorm';
import { PriceProvider } from '../entities/price-provider.entity';

export class PriceProviderRepository extends Repository<PriceProvider> {
    constructor(dataSource: DataSource) {
        super(PriceProvider, dataSource.createEntityManager());
    }
}
