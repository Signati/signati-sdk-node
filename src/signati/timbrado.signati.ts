import { AxiosInstance } from 'axios';

export class Timbrado {
    private http: AxiosInstance;
    private url: string = `/timbrado`

    constructor(http: AxiosInstance) {
        this.http = http
    }

    async facturar<T>(data: any): Promise<T> {
        return await this.http.post<T>(`${this.url}/facturar`, data).then((res) => res.data)
    }
}
