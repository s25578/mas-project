import { DataSource, Repository } from 'typeorm';
import { PSP } from '../entities/psp.entity';

export class PSPRepository extends Repository<PSP> {
    constructor(dataSource: DataSource) {
        super(PSP, dataSource.createEntityManager());
    }
}
