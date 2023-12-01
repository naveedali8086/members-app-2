import {CognitoUserPool} from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "ap-southeast-2_TY9DMpyMD",
    ClientId: "26dmqod43q6tog5k0vq1rbpvfb"
}

export default new CognitoUserPool(poolData)