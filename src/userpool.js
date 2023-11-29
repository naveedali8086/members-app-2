import {CognitoUserPool} from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "ap-southeast-2_hL4U7Miur",
    ClientId: "7q056tq6q8qfsibl88jgqfegvc"
}

export default new CognitoUserPool(poolData)