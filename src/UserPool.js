import {CognitoUserPool} from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-1_NOtGreCO8",
    ClientId: "5riilk7poai7d675e1muts3kpd"
}

export default new CognitoUserPool(poolData)