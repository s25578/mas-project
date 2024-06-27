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

    await AppDataSource.initialize().then(async () => {
        console.log("Data Source has been initialized!");

        // Force synchronize schema
        await AppDataSource.synchronize(true);
        console.log("Database schema synchronized");
    })
    .catch((error) => console.log(error));
    

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

    const cryptoMarket = new Market('Crypto');
    const stockMarket = new Market('Stocks');
    const forexMarket = new Market('Forex');
    const commodityMarket = new Market('Commodities');
    const indexMarket = new Market('Indices');
    const optionMarket = new Market('Options');

    await marketRepository.save(cryptoMarket);
    await marketRepository.save(stockMarket);
    await marketRepository.save(forexMarket);
    await marketRepository.save(commodityMarket);
    await marketRepository.save(indexMarket);
    await marketRepository.save(optionMarket);

    const assetRepository = AppDataSource.getRepository(Asset);

    const assets = [
        // crypto
        new Asset('BTCUSDT', ['Coin'], AssetStatus.ACTIVE, cryptoMarket, null, null, 'This is a first coin'),
        new Asset('ETHUSDT', ['Token'], AssetStatus.ACTIVE, cryptoMarket, null, null, 'Smart contracts father.'),
        new Asset('BNBUSDT', ['Token'], AssetStatus.ACTIVE, cryptoMarket, null, null),
        new Asset('ADAUSDT', ['Token'], AssetStatus.ACTIVE, cryptoMarket, null, null),
        new Asset('XRPUSDT', ['Token'], AssetStatus.ACTIVE, cryptoMarket, null, null),
        new Asset('DOGEUSDT', ['Token', 'Meme'], AssetStatus.ACTIVE, cryptoMarket, null, null),
        new Asset('DOTUSDT', ['Token'], AssetStatus.ACTIVE, cryptoMarket, null, null),
        new Asset('UNIUSDT', ['Token'], AssetStatus.ACTIVE, cryptoMarket, null, null),
        new Asset('LTCUSDT', ['Coin'], AssetStatus.ACTIVE, cryptoMarket, null, null),

        // stocks
        new Asset('AAPL', ['Tech'], AssetStatus.ACTIVE, stockMarket, null, null, 'Apple Inc. produces consumer electronics, computer software, and online services.'),
        new Asset('AMZN', ['Tech'], AssetStatus.ACTIVE, stockMarket, null, null),
        new Asset('TSLA', ['Tech'], AssetStatus.ACTIVE, stockMarket, null, null),
        new Asset('MSFT', ['Tech'], AssetStatus.ACTIVE, stockMarket, null, null),
        new Asset('GOOGL', ['Tech'], AssetStatus.ACTIVE, stockMarket, null, null),
        new Asset('FB', ['Tech'], AssetStatus.ACTIVE, stockMarket, null, null),
        new Asset('BABA', ['Tech'], AssetStatus.ACTIVE, stockMarket, null, null),
        new Asset('NVDA', ['Tech'], AssetStatus.ACTIVE, stockMarket, null, null),
        new Asset('TSM', ['Tech'], AssetStatus.ACTIVE, stockMarket, null, null),

        // forex
        new Asset('EURUSD', ['Forex'], AssetStatus.ACTIVE, forexMarket, null, null),
        new Asset('GBPUSD', ['Forex'], AssetStatus.ACTIVE, forexMarket, null, null),
        new Asset('USDJPY', ['Forex'], AssetStatus.ACTIVE, forexMarket, null, null),
        new Asset('AUDUSD', ['Forex'], AssetStatus.ACTIVE, forexMarket, null, null),
        new Asset('USDCAD', ['Forex'], AssetStatus.ACTIVE, forexMarket, null, null),

        // commodities
        new Asset('XAUUSD', ['Commodity'], AssetStatus.ACTIVE, commodityMarket, null, null),
        new Asset('XAGUSD', ['Commodity'], AssetStatus.ACTIVE, commodityMarket, null, null),
        new Asset('XPTUSD', ['Commodity'], AssetStatus.ACTIVE, commodityMarket, null, null),
        new Asset('XPDUSD', ['Commodity'], AssetStatus.ACTIVE, commodityMarket, null, null),

        // indices
        new Asset('US30', ['Index'], AssetStatus.ACTIVE, indexMarket, null, null),
        new Asset('SPX500', ['Index'], AssetStatus.ACTIVE, indexMarket, null, null),
        new Asset('NAS100', ['Index'], AssetStatus.ACTIVE, indexMarket, null, null),
        new Asset('UK100', ['Index'], AssetStatus.ACTIVE, indexMarket, null, null),
        new Asset('GER30', ['Index'], AssetStatus.ACTIVE, indexMarket, null, null),
        new Asset('JPN225', ['Index'], AssetStatus.ACTIVE, indexMarket, null, null),

        // options
        new Asset('AAPL', ['Tech'], AssetStatus.ACTIVE, optionMarket, null, null),
        new Asset('AMZN', ['Tech'], AssetStatus.ACTIVE, optionMarket, null, null),
    ];

    for (let asset of assets) {
        console.log('Saving asset', asset);
        await assetRepository.save(asset);
    }

    // Allowed assets
    const allowedAssetRepository = AppDataSource.getRepository(AllowedAsset);
    for (let asset of assets) {
        await allowedAssetRepository.save(new AllowedAsset(trader1, asset, 1));
    }

    await AppDataSource.destroy();
}

seed()
    .then(() => {
        console.log('Seeding completed');
    })
    .catch((error) => {
        console.error('Seeding error', error);
    });