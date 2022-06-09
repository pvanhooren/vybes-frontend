import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_GATEWAY_URL,
    headers: {
        "Content-type": "application/json",
    },
});