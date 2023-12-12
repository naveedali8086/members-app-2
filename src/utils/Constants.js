import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://es82ifhb77.execute-api.ap-southeast-2.amazonaws.com/Dev',
    headers: {
        'Content-Type': 'application/json',
        'x-api-Key': "zt95GCM6DV93wASTF81Pl18zIfqdfFg4Vm0sFjS5",
    }
})

export {
    axiosInstance
}