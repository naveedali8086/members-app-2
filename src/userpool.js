import {CognitoUserPool} from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-1_HpB34xCHX",
    ClientId: "2im04h1e5ddj2euu3uptm9pb50"
}

export default new CognitoUserPool(poolData)