import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entitiy/item';
import { AWSService } from 'src/auth/aws.service';
import { AwsAuthGuard } from 'src/auth/aws-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemsService, AWSService, AwsAuthGuard],
  controllers: [ItemsController]
})
export class ItemsModule { }
