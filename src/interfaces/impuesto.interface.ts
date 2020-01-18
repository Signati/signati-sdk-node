export interface ImpuestoCfdiAttributes {
    totalImpuestosRetenidos?: string;
    totalImpuestosTrasladados?: string;
}

export interface ImpuestoCfdi {
    totalImpuestosRetenidos: string;
    totalImpuestosTrasladados: string;
    traslados: TrasladosRetencion[]
    retenciones: TrasladosRetencion[]
}

export interface TrasladosRetencion {
    Base?: string;
    Impuesto: Impuesto;
    TipoFactor: string;
    TasaOCuota: string;
    Importe: string;
}

export enum ImpuestoType {
    ISR = '001',
    IVA = '002'
}

export declare type Impuesto = '001' | '002';
