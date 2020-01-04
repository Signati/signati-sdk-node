import {ImpuestoCfdi, TrasladosRetencion} from '../interfaces/impuesto.interface';

export class Impuesto {
    private impuesto: ImpuestoCfdi = {} as ImpuestoCfdi;

    constructor(impuesto: { totalRetenidos: string, totalTrasladados: string; }) {
        this.impuesto.totalImpuestosRetenidos = impuesto.totalRetenidos;
        this.impuesto.totalImpuestosRetenidos = impuesto.totalTrasladados;
    }

    public async addTraslados(translados: TrasladosRetencion[]) {
        this.impuesto.traslados = translados;
        return this;
    }

    public async addRetenciones(retenciones: TrasladosRetencion[]) {
        this.impuesto.retenciones = retenciones;
        return this;
    }

    public getImpuestos(): ImpuestoCfdi {
        return this.impuesto;
    }

}