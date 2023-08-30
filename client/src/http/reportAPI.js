import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createReport = async (report) => {
    const {data} = await $authHost.post('api/report', report)
    return data
}

export const fetchReport = async (page, limit = 5) => {
    const {data} = await $host.get('api/report', {params: {
        page, limit
    }
    })
    return data
}

export const fetchOneReport = async (id) => {
    const {data} = await $host.get('api/report/' + id)
    return data
}

