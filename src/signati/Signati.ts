import axios, { AxiosInstance } from 'axios';
import { Timbrado } from './timbrado.signati';

export class Signati {
    protected readonly Http: AxiosInstance;
    private baseURL = 'http://0.0.0.0:6500'

    constructor(apiKey) {
        this.Http = axios.create({
            baseURL: this.baseURL,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
    }

    public timbrado() {
        return new Timbrado(this.Http)
    }

}
