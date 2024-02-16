import { Module } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { AuthController } from './auth.controller';
import { AWSService } from './aws.service';
import { AwsAuthGuard } from './aws-auth.guard';

@Module({
    providers: [CognitoService, AWSService, AwsAuthGuard],
    controllers: [AuthController]
})
export class AuthModule { }