import * as axios from "axios"

const key = "3c89ce61047d7a8e5a0e20b12ec0b66c"

export const getAPI={
    getCurrenciesData() {
        return axios.get(`http://data.fixer.io/api/latest?access_key=${key}`
        ).then(response => response)
    },
}

