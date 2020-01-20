import {CfdiXml, DatosCfdi} from '../interfaces/cfdi.interface';
import {Emisor} from './emisor.class';
import {Receptor} from './receptor.class';
import {Relacionado} from './relacionado.class';
import {EmisorCfdi} from '../interfaces/emisor.interface';
import {ReceptorCfdi} from '../interfaces/receptor.interface';
import {RelacionadoCfdi} from '../interfaces/relacionado.interface';
import {Impuesto} from './impuesto.class';
import {Concepto} from './concepto.class';
import {add, sub, round} from 'exact-math';

export default class CFDI {
    private cfdi: CfdiXml = {} as CfdiXml;

    constructor(data?: DatosCfdi) {
        this.cfdi.datos = data as any;
    }

    public relacion(relation: RelacionadoCfdi) {
        const rel = new Relacionado(relation.TipoRelacion);
        rel.addRelationUuid(relation.UUID);
        this.cfdi.relacionado = rel.getRelation();
    }

    public emisor(emisor: EmisorCfdi) {
        this.cfdi.emisor = new Emisor(emisor).getEmisor();
        return this;
    }

    public receptor(receptor: ReceptorCfdi) {
        this.cfdi.receptor = new Receptor(receptor).getReceptor();
        return this;
    }

    public concepto(concept: Concepto) {
        if (!this.cfdi.conceptos) {
            this.cfdi.conceptos = []
        }
        this.cfdi.conceptos.push(concept.getConcept());
        return this
    }

    public impuesto(impuesto: Impuesto) {
        this.cfdi.impuestos = impuesto.getImpuestos();
        return this;
    }

    public getSubtotal(): string {
        return this.cfdi.conceptos.reduce((previousValue, currentValue) => round(
            add(previousValue, currentValue.Importe, true), -2, {returnString: true, trim: false}), '0.00');
    }

    public getTotal() {
        const subtotal = sub(this.getSubtotal(), this.cfdi.datos.Descuento);

        const totalImpuestos = this.cfdi.conceptos.reduce((previousValue, currentValue) => round(
            add(previousValue, currentValue.Impuestos?.traslados.reduce(
                (previousValue, currentValue) => add(previousValue, currentValue.Importe), '0.00')
                ?? '0.00', true), -2, {returnString: true, trim: false}), '0.00');
        return round(add(subtotal, totalImpuestos, {returnString: true}), -2, {returnString: true, trim: false})
    }

    validateAll() {
        const state = {
            isFail: false,
            errors: [] as any[],
        };

        const differenceSubTotal = sub(this.cfdi.datos.SubTotal, this.getSubtotal(), {returnString: false});
        if (differenceSubTotal) {
            state.errors.push({
                message: 'El SubTotal del CFDI no coincide con el Importe de conceptos.',
                payload: `SubTotal CFDI = ${this.cfdi.datos.SubTotal}, Total Conceptos ${this.getSubtotal()}`
            })
        }

        const differenceTotal = sub(this.cfdi.datos.Total, this.getTotal(), {returnString: false});
        if (differenceTotal) {
            state.errors.push({
                message: 'El Total del CFDI no coincide con el Total de conceptos e impuestos.',
                payload: `Total CFDI = ${this.cfdi.datos.Total}, Total Conceptos ${this.getTotal()}`
            })
        }
        return state;
    }

    public getCfdi(): CfdiXml {
        const cfdiObject = {...this.cfdi};
        this.cfdi = {} as CfdiXml;
        return cfdiObject
    }
}
