import {createConnection, getConnection, getRepository} from 'typeorm';
import { AppDataSource } from '../data-source';
import { Admin } from '../src/entities/admin.entity';
import { Manager } from '../src/entities/manager.entity';
import { Trader } from '../src/entities/trader.entity';
import { UserRole } from '../src/enums/user-role.enum';
import { KYCStatus } from '../src/enums/kyc-status.enum';
import {NestFactory} from "@nestjs/core";
import {AppModule} from "../src/app.module";
import {PositionRepository} from "../src/repositories/position.repository";
import {Position} from "../src/entities/position.entity";
import {OpenedPosition} from "../src/entities/opened-position.entity";
import {Market} from "../src/entities/market.entity";
import {Asset} from "../src/entities/asset.entity";
import {AssetStatus} from "../src/enums/asset-status.enum";
import {Account} from "../src/entities/account.entity";
import {AllowedAsset} from "../src/entities/allowed-asset.entity";


async function seed() {

    await AppDataSource.initialize();

    const adminRepository = AppDataSource.getRepository(Admin);
    const managerRepository = AppDataSource.getRepository(Manager);
    const traderRepository = AppDataSource.getRepository(Trader);


    // Create Admin
    // const admin = new Admin(1, 'Admin User', 'admin@example.com', 'admin123');
    // admin.notificationPreferences = ['email'];
    // await adminRepository.save(admin);

    // Trader
    // (id: number, name: string, email: string, password: string, countryCode: string, experienceLevel?: number, maxLeverage?: number, positionLimit?: number, contactNumber?: number)
    const trader1 = new Trader(2, 'John Doe', 'test@test.me', 'test123', 'US', 1, 100, 10000, 1234567890);
    await traderRepository.save(trader1);

    // Account
    const  accountRepository = AppDataSource.getRepository(Account);
    const account1 = new Account(trader1, false);
    await accountRepository.save(account1);



    // add Markets and Assets
    const marketRepository = AppDataSource.getRepository(Market);

    const market1 = new Market('Crypto');
    const market2 = new Market('Stocks');

    await marketRepository.save(market1);
    await marketRepository.save(market2);

    const assetRepository = AppDataSource.getRepository(Asset);

    const asset2 = new Asset('AAPL', ['Tech'], AssetStatus.ACTIVE, market1, null, null);
    const asset1 = new Asset('BTCUSDT', ['Coin'], AssetStatus.ACTIVE, market2, null, null);
    const asset3 = new Asset('ETHUSDT', ['Token'], AssetStatus.ACTIVE, market2, null, null);

    await assetRepository.save(asset1);
    await assetRepository.save(asset2);
    await assetRepository.save(asset3);

    // Allowed assets
    const allowedAssetRepository = AppDataSource.getRepository(AllowedAsset);
    const allowedAsset1 = new AllowedAsset(trader1, asset1, 1);
    const allowedAsset2 = new AllowedAsset(trader1, asset2, 1)
    const allowedAsset3 = new AllowedAsset(trader1, asset3, 1);
    await allowedAssetRepository.save(allowedAsset1);
    await allowedAssetRepository.save(allowedAsset2);
    await allowedAssetRepository.save(allowedAsset3);

    await AppDataSource.destroy();
}

seed()
    .then(() => {
        console.log('Seeding completed');
    })
    .catch((error) => {
        console.error('Seeding error', error);
    });