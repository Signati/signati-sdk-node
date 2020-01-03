export interface ImpuestoCfdi {
    totalImpuestosRetenidos: string;
    totalImpuestosTrasladados: string;
    traslados: trasladosRetencion[]
    retenciones: trasladosRetencion[]
}

export interface trasladosRetencion {
    Base?: string;
    Impuesto: string;
    TipoFactor: string;
    TasaOCuota: string;
    Importe: string;
}