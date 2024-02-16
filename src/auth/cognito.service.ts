import { Injectable } from "@nestjs/common";
import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'; // Import CognitoUserSession
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CognitoService {
    private readonly cognitoClient: CognitoIdentityServiceProvider;
    private readonly clientId: string;
    private readonly poolId: string;

    constructor () {
        this.cognitoClient = new CognitoIdentityServiceProvider();
        this.clientId = process.env.AWS_COGNITO_CLIENT_ID;
        this.poolId = process.env.AWS_COGNITO_USER_POOL_ID;
    }

    async registerUser (username: string, password: string, email: string): Promise<string> {
        const params = {
            ClientId: this.clientId,
            Username: username,
            Password: password,
            UserAttributes: [
                { Name: 'custom:role', Value: 'Customer' },
                { Name: 'email', Value: email }
            ],
        };

        try
        {
            await this.cognitoClient.signUp(params).promise();
            return 'User registered successfully';
        } catch (error)
        {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    async confirmUser (username: string, verificationCode: string): Promise<string> {
        const params = {
            ClientId: this.clientId,
            ConfirmationCode: verificationCode,
            Username: username,
        };

        try
        {
            await this.cognitoClient.confirmSignUp(params).promise();
            return 'User confirmed successfully';
        } catch (error)
        {
            console.error('Error confirming user:', error);
            throw error;
        }
    }

    async authenticateUser (username: string, password: string): Promise<any> {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: this.clientId,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
        };

        try
        {
            const response = await this.cognitoClient.initiateAuth(params).promise();
            const accesstoken = response.AuthenticationResult.AccessToken;

            const userAttributes = await this.getUserAttributes(accesstoken);

            const roleAttribute = userAttributes.find((attr: { Name: string; }) => attr.Name === 'custom:role');
            const userRole = roleAttribute ? roleAttribute.Value : null;


            return {
                ...response.AuthenticationResult,
                role: userRole
            };
        } catch (error)
        {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }

    async getUserAttributes (accesstoken: string): Promise<any> {
        try
        {
            const response = await this.cognitoClient.getUser({
                AccessToken: accesstoken,
            }).promise();
            return response.UserAttributes;
        } catch (error)
        {
            console.log('Error fetching user attributes', error);

        }
    }

    async logoutUser (accesstoken: string): Promise<any> {
        const params = {
            AccessToken: accesstoken,
        };

        try
        {
            const response = await this.cognitoClient.globalSignOut(params).promise();
            return response;
        } catch (error)
        {
            console.error('Error logout user:', error);
            throw error;
        }
    }

    async getUserInfo (accesstoken: string): Promise<any> {
        try
        {
            const response = await this.cognitoClient.getUser({
                AccessToken: accesstoken,
            }).promise();
            return response;
        } catch (error)
        {
            console.log('Error fetching user attributes', error);

        }
    }

}
