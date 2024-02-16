import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entitiy/item';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { AWSService } from './auth/aws.service';
dotenv.config();

@Module({
    imports: [
        AuthModule,
        ItemsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST,
            port: parseInt(process.env.PG_PORT, 10),
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            ssl: {
                rejectUnauthorized: false,
            },
            synchronize: true,
            entities: [Item],
        }),
        TypeOrmModule.forFeature([Item]),
    ],
    controllers: [],
    providers: [AWSService],
})
export class AppModule { }
