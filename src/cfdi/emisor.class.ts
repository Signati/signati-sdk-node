import {EmisorCfdi} from '../interfaces/emisor.interface';

export class Emisor {
    emisor: EmisorCfdi = {} as EmisorCfdi;

    constructor(emisor: EmisorCfdi) {
        this.emisor = emisor;
    }
}