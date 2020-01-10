import * as yup from 'yup';

export interface CFDIInfo {
    // Version?: string;
    Serie: string;
    Folio: string;
    // Fecha: string;
    // Sello: string;
    FormaPago: string;
    // NoCertificado: string;
    // Certificado: string;
    SubTotal: string;
    Descuento: string;
    Moneda: string;
    Total: string;
    TipoDeComprobante: string;
    MetodoPago: string;
    LugarExpedicion: string;
    condicionesDePago?: string;
}

export default yup.object<CFDIInfo>().shape({
    Serie: yup.string().required(),
    Folio: yup.string().required(),
    // Fecha: string;
    // Sello: string;
    FormaPago: yup.string().required(),
    // NoCertificado: string;
    // Certificado: string;
    SubTotal: yup.string().required(),
    Descuento: yup.string().required(),
    Moneda: yup.string().required(),
    Total: yup.string().notRequired(),
    TipoDeComprobante: yup.string().required(),
    MetodoPago: yup.string().required(),
    LugarExpedicion: yup.string().required(),
    condicionesDePago: yup.string(),
});
