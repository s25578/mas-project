import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingController } from './controllers/ping/ping.controller';
import { PositionController } from './controllers/position/position.controller';
import { PositionService } from './services/position.service';
import {OpenedPosition} from "./entities/opened-position.entity";
import {ClosedPosition} from "./entities/closed-position.entity";
import { MarketController } from './controllers/market/market.controller';
import {MarketService} from "./services/market.service";
import {Market} from "./entities/market.entity";
import { AssetController } from './controllers/asset/asset.controller';
import {Asset} from "./entities/asset.entity";
import {AssetService} from "./services/asset.service";
import {Account} from "./entities/account.entity";
import {AccountService} from "./services/account.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      subscribers: [],
      migrations: [],
    }),
    TypeOrmModule.forFeature([OpenedPosition, ClosedPosition, Market, Asset, Account])
  ],
  controllers: [AppController, PingController, PositionController, MarketController, AssetController],
  providers: [AppService, PositionService, MarketService, AssetService, AccountService],
})
export class AppModule {}
