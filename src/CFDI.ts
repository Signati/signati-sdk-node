// import {CfdiXml, DatosCfdi} from './interfaces/cfdi.interface';
import {Emisor} from './cfdi/emisor.class';
import {Receptor} from './cfdi/receptor.class';
import {Relacionado} from './cfdi/relacionado.class';
import {EmisorCfdi} from './interfaces/emisor.interface';
import {ReceptorCfdi} from './interfaces/receptor.interface';
import {RelacionadoCfdi} from './interfaces/relacionado.interface';
import {Impuesto} from './cfdi/impuesto.class';
import {Concepto} from './cfdi/concepto.class';
import {ConceptoCfdi} from "./interfaces/concepto.interface";
import {ImpuestoCfdi} from "./interfaces/impuesto.interface";

export interface CFDIModel {
    datos: CFDIInfo;
    relacionado: RelacionadoCfdi;
    emisor: EmisorCfdi;
    receptor: ReceptorCfdi;
    conceptos: ConceptoCfdi[];
    impuestos: ImpuestoCfdi;
    complemento: any;
}

export interface CFDIInfo {
    // Version?: string;
    Serie: string;
    Folio: string;
    // Fecha: string;
    // Sello: string;
    FormaPago: string;
    // NoCertificado: string;
    // Certificado: string;
    condicionesDePago ?: string;
    SubTotal: string;
    Descuento: string;
    Moneda: string;
    Total: string;
    TipoDeComprobante: string;
    MetodoPago: string;
    LugarExpedicion: string;
}

export interface CFDIModelNew {
    datos: CFDIInfo;
    emisor:  EmisorCfdi;
    receptor:  ReceptorCfdi;
    conceptos?:  ConceptoCfdi[];
    relacionado?: RelacionadoCfdi;
    impuestos?: ImpuestoCfdi;
}




export default class CFDI<T extends CFDIModelNew> {

    constructor(protected cfdi: T = {} as any){ }

    public relacion(relation: RelacionadoCfdi) {
        this.cfdi = { ...this.cfdi, relacionado: relation };
        return this;
    }

    public emisor(emisor: EmisorCfdi) {
        this.cfdi = { ...this.cfdi , emisor};
        return this;
    }

    public receptor(receptor: ReceptorCfdi) {
        this.cfdi = { ...this.cfdi, receptor };
        return this;
    }

    public concepto(concept: Concepto) {
        if (!this.cfdi.conceptos) {
            this.cfdi.conceptos = [];
        }
        this.cfdi.conceptos.push(concept.getConcept());
        return this
    }

    public impuesto(impuesto: Impuesto) {
        this.cfdi.impuestos = impuesto.getImpuestos();
        return this;
    }

    public getCfdi(): CFDIModelNew {
        return this.cfdi;
    }
}
