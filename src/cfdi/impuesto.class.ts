import {ImpuestoCfdi, ImpuestoCfdiAttributes, TrasladosRetencion} from '../interfaces/impuesto.interface';
import {add, round} from 'exact-math'

export class Impuesto {
    private impuesto: ImpuestoCfdi = {} as ImpuestoCfdi;


    constructor(impuesto: ImpuestoCfdiAttributes = {} as ImpuestoCfdiAttributes) {
        if (impuesto.totalImpuestosRetenidos)
            this.impuesto.totalImpuestosRetenidos = impuesto.totalImpuestosRetenidos;
        if (impuesto.totalImpuestosTrasladados)
            this.impuesto.totalImpuestosTrasladados = impuesto.totalImpuestosTrasladados;
    }

    public async traslados(translados: TrasladosRetencion[]) {
        this.impuesto.traslados = translados;
        return this;
    }

    public async retenciones(retenciones: TrasladosRetencion[]) {
        this.impuesto.retenciones = retenciones;
        return this;
    }

    validate() {
        const total = this.impuesto.traslados.reduce((previousValue, currentValue) => {
            return round(add(previousValue, currentValue.Importe, {returnString: true}), -2, {
                returnString: true,
                trim: false
            });
        }, '0.00');
        return round(this.impuesto.totalImpuestosTrasladados, -2, {returnString: true, trim: false}) === total
    }


    public getImpuestos(): ImpuestoCfdi {
        return this.impuesto;
    }

}
