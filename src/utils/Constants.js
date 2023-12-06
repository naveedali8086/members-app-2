import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://es82ifhb77.execute-api.ap-southeast-2.amazonaws.com/Dev',
    // headers: {
    //     'Content-Type': 'application/json',
    //     'key': 'Wu5OJfZWu5OJfZe8OPbJRcDfbT7ZDQQquojRj1zHrkWkVonVQRhD3kpAs6ILGV8R0ROAn1exsHameKvmqOp3qjte8OPbJRcDfbT7ZDQQquojRj1zHrkWkVonVQRhD3kpAs6ILGV8R0ROAn1exsHameKvmqOp3qjt',
    // }
})

export {
    axiosInstance
}