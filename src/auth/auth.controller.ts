import { Controller, Post, Body, Request, UseGuards, Header, Get, Req } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { AwsAuthGuard } from './aws-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly cognitoService: CognitoService) { }

    @Post('register')
    async registerUser (@Body() body: { username: string; password: string; email: string; }): Promise<string> {
        const { username, password, email } = body;
        return await this.cognitoService.registerUser(username, password, email);
    }

    @Post('confirm')
    async confirmUser (@Body() body: { username: string; verificationCode: string; }): Promise<string> {
        const { username, verificationCode } = body;
        return await this.cognitoService.confirmUser(username, verificationCode);
    }

    @Post('login')
    async loginUser (@Body() body: { username: string; password: string; }): Promise<any> {
        const { username, password } = body;
        return this.cognitoService.authenticateUser(username, password);
    }

    @Get('userinfo')
    @UseGuards(AwsAuthGuard)
    async getUserInfo (@Req() request: any): Promise<any> {
        const accessToken = request.headers.authorization;
        return this.cognitoService.getUserInfo(accessToken);
    }
    @Post('logout')
    @UseGuards(AwsAuthGuard)
    async logoutUser (@Body('accesstoken') accesstoken: string): Promise<any> {
        return this.cognitoService.logoutUser(accesstoken);
    }
}
