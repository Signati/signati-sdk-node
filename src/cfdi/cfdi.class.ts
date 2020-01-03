import {CfdiXml, DatosCfdi} from '../interfaces/cfdi.interface';
import {Emisor} from './emisor.class';

export class CfdiClass {
    cfdi: CfdiXml = {} as CfdiXml;

    constructor(data: DatosCfdi) {
        this.cfdi.datos = data;
    }

    public async emisor(emisor: Emisor) {

    }


}