import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AWSService } from './aws.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AwsAuthGuard implements CanActivate {
    constructor (
        private readonly awsService: AWSService,
        private readonly reflector: Reflector,
    ) { }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!requiredRoles)
        {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers['authorization'];

        if (!accessToken)
        {
            return false;
        }

        return this.validateRoles(accessToken, requiredRoles);
    }

    private async validateRoles (accessToken: string, requiredRoles: any[]): Promise<boolean> {
        const userRoles = await this.awsService.validateCognitoToken(accessToken) as string[];

        const hasRole = requiredRoles.some(role => userRoles.includes(role));
        if (!hasRole)
        {
            throw new UnauthorizedException('Unauthorized role.');
        }

        return true;
    }
}
