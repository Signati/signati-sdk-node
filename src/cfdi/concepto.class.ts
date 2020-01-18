import {ConceptoCfdi, ConceptProperty} from '../interfaces/concepto.interface';
import {ImpuestoCfdi, TrasladosRetencion} from '../interfaces/impuesto.interface';
import {mul, round, sub} from 'exact-math'

export class Concepto {
    private concept: ConceptoCfdi = {} as ConceptoCfdi;


    constructor(concept: ConceptProperty) {
        this.concept = concept
    }

    public getImpuestoBase(): string {
        const discount = this.concept.Descuento ? this.concept.Descuento : 0;
        const total = round(sub(mul(
            this.concept.Cantidad,
            this.concept.ValorUnitario,
            {returnString: true}
        ), discount), -2, {returnString: true, trim: false})
        return total;
    }

    public getImpuestoImporte(tasa: string | number) {
        const importe = round(mul(
            this.getImpuestoBase(),
            tasa,
            {returnString: true}
        ), -2, {returnString: true, trim: false});
        return importe;
    }

    public traslado(transfer: TrasladosRetencion) {

        if (!this.concept.Impuestos) {
            this.concept.Impuestos = {} as ImpuestoCfdi;
        }
        if (!this.concept.Impuestos.traslados) {
            this.concept.Impuestos.traslados = [];
        }
        this.concept.Impuestos.traslados.push(transfer);
        return this;
    }

    public retencion(retention: TrasladosRetencion) {
        if (!this.concept.Impuestos) {
            this.concept.Impuestos = {} as ImpuestoCfdi
        }
        if (!this.concept.Impuestos.retenciones) {
            this.concept.Impuestos.retenciones = [];
        }

        this.concept.Impuestos.retenciones.push(retention)
        return this;
    }

    validate() {
        let state = {
            isFail: false,
            errors: [] as any[]
        };
        const discount = this.concept.Descuento ? this.concept.Descuento : 0;
        if (
            !(round(
                sub(mul(
                    this.concept.Cantidad,
                    this.concept.ValorUnitario,
                    {returnString: true}
                ), discount), -2, {returnString: true, trim: false}) === this.concept.Importe)) {
            state.errors.push({
                message: 'La cantidad del concepto * ValorUnitario no coincide con el importe',
                payload: this.concept
            })
            state.isFail = true
        }

        if (this.concept.Impuestos) {

            for (const traslado of this.concept.Impuestos.traslados) {
                if (!traslado.Importe === round(mul(traslado.Base, traslado.TasaOCuota, {returnString: true}), -2, {
                    returnString: true,
                    trim: false
                })) {
                    if (!state.isFail) {
                        state.isFail = true
                    }
                    state.errors.push({
                        message: 'Un traslado no coincide en la operación de Base * TasaOCuota === Importe ',
                        payload: traslado
                    })
                }

            }
        } else {
            state.isFail = true;
            state.errors.push({
                message: 'No existe Impuestos en el concepto',
                payload: this.concept
            })
        }
        return state;
    }

    getConcept(): ConceptoCfdi {
        return this.concept;
        // pushConcepto(cfdi.jxml, this.concepto);
    }
}
