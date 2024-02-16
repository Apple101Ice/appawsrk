import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';

@Injectable()
export class AWSService {
    private readonly cognitoIdentityServiceProvider: AWS.CognitoIdentityServiceProvider;

    constructor () {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

        this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    }

    async validateCognitoToken (accessToken: string): Promise<string[]> {
        try
        {
            const response = await this.cognitoIdentityServiceProvider.getUser({
                AccessToken: accessToken,
            }).promise();


            const userRoles = response.UserAttributes
                .filter(attr => attr.Name === 'custom:role')
                .map(attr => attr.Value);

            return userRoles;
        } catch (error)
        {
            console.error('Error validating token:', error);
            return [];
        }
    }
}
