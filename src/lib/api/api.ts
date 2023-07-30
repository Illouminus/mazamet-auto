import axios from 'axios'
import {USER_LOCALSTORAGE_KEY} from "@/lib/const/localstorage";


export const $api = axios.create({
    baseURL: process.env.BASE_URL
})
