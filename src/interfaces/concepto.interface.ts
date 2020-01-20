import {ImpuestoCfdi} from './impuesto.interface';

export interface ConceptoCfdi extends Concept {
    Impuestos?: ImpuestoCfdi
    ComplementoConcepto?: any
}

export interface Concept {
    ClaveProdServ: string;
    NoIdentificacion: string;
    Cantidad: number | string;
    ClaveUnidad: string;
    Unidad: string;
    Descripcion: string;
    ValorUnitario: number | string;
    Importe: number | string;
    Descuento?: number | string;
}
