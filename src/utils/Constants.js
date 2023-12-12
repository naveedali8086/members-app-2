import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://es82ifhb77.execute-api.ap-southeast-2.amazonaws.com/Dev',
    headers: {
        'Content-Type': 'application/json',
        'x-api-Key': process.env.REACT_APP_API_KEY,
    }
})

export {
    axiosInstance
}