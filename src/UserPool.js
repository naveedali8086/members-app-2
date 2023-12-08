import {CognitoUserPool} from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-1_CTaG4hpI8",
    ClientId: "3trnoh04q35bqpb4n11le7433i"
}

export default new CognitoUserPool(poolData)