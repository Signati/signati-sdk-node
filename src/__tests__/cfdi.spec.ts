import {CFDI, CfdiClass, Concepto, Impuesto} from '..';
describe('Create CFDI',() => {

    test('Return this CFDI', () => {
        const useCFDI = () => {
            const cfdi = new CfdiClass({
                Serie: 'A',
                Folio: '2303240',
                // Fecha: 'asdasdasd',
                FormaPago: '03',
                // condicionesDePago: 'CONTADO',
                // condicionesDePago: 'PUE',
                SubTotal: '1850',
                Descuento: '175.00',
                Moneda: 'MXN',
                Total: '1943.00',
                TipoDeComprobante: 'I',
                MetodoPago: 'PUE',
                LugarExpedicion: '77728',
            });
            cfdi.relacion({
                TipoRelacion: '04',
                UUID: [
                    '9C67E772-318E-11EA-B788-ADCD358BE878',
                    // 'AAC9D1BC-3243-11EA-826E-15874F0FD22E',
                ],
            });
            cfdi.emisor({
                Rfc: 'TCM970625MB1',
                Nombre: 'FACTURACION MODERNA SA DE CV',
                RegimenFiscal: '601',
            });
            cfdi.receptor({
                Rfc: 'XAXX010101000',
                Nombre: 'PUBLICO EN GENERAL',
                UsoCFDI: 'G01',
            });
            const concept = new Concepto({
                ClaveProdServ: '01010101',
                NoIdentificacion: 'AULOG001',
                Cantidad: '5',
                ClaveUnidad: 'H87',
                Unidad: 'Pieza',
                Descripcion: 'Aurriculares USB Logitech',
                ValorUnitario: '350.00',
                Importe: '1750.00',
                Descuento: '175.00',
            });
            concept.traslado({
                Base: '1575.10',
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: '252.00',
            });
            cfdi.concepto(concept);

            const concept2 = new Concepto({
                ClaveProdServ: '43201800',
                NoIdentificacion: 'USB',
                Cantidad: '1',
                ClaveUnidad: 'H87',
                Unidad: 'Pieza',
                Descripcion: 'Memoria USB 32gb marca Kingston',
                ValorUnitario: '100.00',
                Importe: '100.00',
            });
            concept2.traslado({
                Base: '100.00',
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: '16.00',
            });
            cfdi.concepto(concept2);

            const impuesto = new Impuesto({
                totalImpuestosTrasladados: '268.00',
            });
            impuesto.addTraslados([{
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: '268.00',
            }]);
            cfdi.impuesto(impuesto);
            console.log(cfdi.getSubtotal());
            console.log(cfdi.getTotal());
            console.log(cfdi.validateAll());

            return cfdi.getCfdi();
        }
        expect(useCFDI()).toStrictEqual({
                "datos": {
                    "Serie": "A",
                    "Folio": "2303240",
                    "FormaPago": "03",
                    "SubTotal": "1850",
                    "Descuento": "175.00",
                    "Moneda": "MXN",
                    "Total": "1943.00",
                    "TipoDeComprobante": "I",
                    "MetodoPago": "PUE",
                    "LugarExpedicion": "77728"
                },
                "relacionado": {
                    "TipoRelacion": "04",
                    "UUID": [
                        "9C67E772-318E-11EA-B788-ADCD358BE878"
                    ]
                },
                "emisor": {
                    "Rfc": "TCM970625MB1",
                    "Nombre": "FACTURACION MODERNA SA DE CV",
                    "RegimenFiscal": "601"
                },
                "receptor": {
                    "Rfc": "XAXX010101000",
                    "Nombre": "PUBLICO EN GENERAL",
                    "UsoCFDI": "G01"
                },
                "conceptos": [
                    {
                        "ClaveProdServ": "01010101",
                        "NoIdentificacion": "AULOG001",
                        "Cantidad": "5",
                        "ClaveUnidad": "H87",
                        "Unidad": "Pieza",
                        "Descripcion": "Aurriculares USB Logitech",
                        "ValorUnitario": "350.00",
                        "Importe": "1750.00",
                        "Descuento": "175.00",
                        "Impuestos": {
                            "traslados": [
                                {
                                    "Base": "1575.10",
                                    "Impuesto": "002",
                                    "TipoFactor": "Tasa",
                                    "TasaOCuota": "0.160000",
                                    "Importe": "252.00"
                                }
                            ]
                        }
                    },
                    {
                        "ClaveProdServ": "43201800",
                        "NoIdentificacion": "USB",
                        "Cantidad": "1",
                        "ClaveUnidad": "H87",
                        "Unidad": "Pieza",
                        "Descripcion": "Memoria USB 32gb marca Kingston",
                        "ValorUnitario": "100.00",
                        "Importe": "100.00",
                        "Impuestos": {
                            "traslados": [
                                {
                                    "Base": "100.00",
                                    "Impuesto": "002",
                                    "TipoFactor": "Tasa",
                                    "TasaOCuota": "0.160000",
                                    "Importe": "16.00"
                                }
                            ]
                        }
                    }
                ],
                "impuestos": {
                    "totalImpuestosTrasladados": "268.00",
                    "traslados": [
                        {
                            "Impuesto": "002",
                            "TipoFactor": "Tasa",
                            "TasaOCuota": "0.160000",
                            "Importe": "268.00"
                        }
                    ]
                }
            }
        );
    });

    test('New CFDI', () => {
        const useCFDI = () => {
            const cfdi = new CFDI({
                datos: {
                    Serie: 'A',
                    Folio: '2303240',
                    // Fecha: 'asdasdasd',
                    FormaPago: '03',
                    // condicionesDePago: 'CONTADO',
                    // condicionesDePago: 'PUE',
                    SubTotal: '1850',
                    Descuento: '175.00',
                    Moneda: 'MXN',
                    Total: '1943.00',
                    TipoDeComprobante: 'I',
                    MetodoPago: 'PUE',
                    LugarExpedicion: '77728',
                },
                emisor: {
                    Rfc: 'TCM970625MB1',
                    Nombre: 'FACTURACION MODERNA SA DE CV',
                    RegimenFiscal: '601',
                },
                receptor: {
                    Rfc: 'XAXX010101000',
                    Nombre: 'PUBLICO EN GENERAL',
                    UsoCFDI: 'G01',
                },
            });
            cfdi.relacion({
                TipoRelacion: '04',
                UUID: [
                    '9C67E772-318E-11EA-B788-ADCD358BE878',
                    // 'AAC9D1BC-3243-11EA-826E-15874F0FD22E',
                ],
            });
            cfdi.emisor({
                Rfc: 'TCM970625MB1',
                Nombre: 'FACTURACION MODERNA SA DE CV',
                RegimenFiscal: '601',
            });
            cfdi.receptor({
                Rfc: 'XAXX010101000',
                Nombre: 'PUBLICO EN GENERAL',
                UsoCFDI: 'G01',
            });
            const concept = new Concepto({
                ClaveProdServ: '01010101',
                NoIdentificacion: 'AULOG001',
                Cantidad: '5',
                ClaveUnidad: 'H87',
                Unidad: 'Pieza',
                Descripcion: 'Aurriculares USB Logitech',
                ValorUnitario: '350.00',
                Importe: '1750.00',
                Descuento: '175.00',
            });
            concept.traslado({
                Base: '1575.00',
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: '252.00',
            });
            cfdi.concepto(concept);

            const concept2 = new Concepto({
                ClaveProdServ: '43201800',
                NoIdentificacion: 'USB',
                Cantidad: '1',
                ClaveUnidad: 'H87',
                Unidad: 'Pieza',
                Descripcion: 'Memoria USB 32gb marca Kingston',
                ValorUnitario: '100.00',
                Importe: '100.00',
            });
            concept2.traslado({
                Base: '100.00',
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: '16.00',
            });
            cfdi.concepto(concept2);

            const impuesto = new Impuesto({
                totalImpuestosTrasladados: '268.00',
            });
            impuesto.addTraslados([{
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: '268.00',
            }]);
            cfdi.impuesto(impuesto);
            return cfdi.getCfdi();
        }
        expect(useCFDI()).toStrictEqual({
                "datos": {
                    "Serie": "A",
                    "Folio": "2303240",
                    "FormaPago": "03",
                    "SubTotal": "1850",
                    "Descuento": "175.00",
                    "Moneda": "MXN",
                    "Total": "1943.00",
                    "TipoDeComprobante": "I",
                    "MetodoPago": "PUE",
                    "LugarExpedicion": "77728"
                },
                "relacionado": {
                    "TipoRelacion": "04",
                    "UUID": [
                        "9C67E772-318E-11EA-B788-ADCD358BE878"
                    ]
                },
                "emisor": {
                    "Rfc": "TCM970625MB1",
                    "Nombre": "FACTURACION MODERNA SA DE CV",
                    "RegimenFiscal": "601"
                },
                "receptor": {
                    "Rfc": "XAXX010101000",
                    "Nombre": "PUBLICO EN GENERAL",
                    "UsoCFDI": "G01"
                },
                "conceptos": [
                    {
                        "ClaveProdServ": "01010101",
                        "NoIdentificacion": "AULOG001",
                        "Cantidad": "5",
                        "ClaveUnidad": "H87",
                        "Unidad": "Pieza",
                        "Descripcion": "Aurriculares USB Logitech",
                        "ValorUnitario": "350.00",
                        // Cantidad * ValorUnitario === Importe
                        "Importe": "1750.00",
                        "Descuento": "175.00",
                        "Impuestos": {
                            // Base * TasaOCuota === Importe
                            "traslados": [
                                {
                                    "Base": "1575.00",
                                    "Impuesto": "002",
                                    "TipoFactor": "Tasa",
                                    "TasaOCuota": "0.160000",
                                    "Importe": "252.00"
                                }
                            ]
                        }
                    },
                    {
                        "ClaveProdServ": "43201800",
                        "NoIdentificacion": "USB",
                        "Cantidad": "1",
                        "ClaveUnidad": "H87",
                        "Unidad": "Pieza",
                        "Descripcion": "Memoria USB 32gb marca Kingston",
                        "ValorUnitario": "100.00",
                        "Importe": "100.00",
                        "Impuestos": {
                            "traslados": [
                                {
                                    "Base": "100.00",
                                    "Impuesto": "002",
                                    "TipoFactor": "Tasa",
                                    "TasaOCuota": "0.160000",
                                    "Importe": "16.00"
                                }
                            ]
                        }
                    }
                ],
                "impuestos": {
                    // totalImpuestosTrasladados === traslados.reduce(v => v + Importe)
                    "totalImpuestosTrasladados": "268.00",
                    "traslados": [
                        {
                            "Impuesto": "002",
                            "TipoFactor": "Tasa",
                            "TasaOCuota": "0.160000",
                            "Importe": "268.00"
                        }
                    ]
                }
            }
        );
    });
    test('Prueba si el total de traslados es igual a los conceptos en el importe', function() {
        function as() {
            const impuesto = new Impuesto({
                totalImpuestosTrasladados: '268.00',
            });
            impuesto.addTraslados([{
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: '268.00',
            }]);
            return impuesto.validate();
        }

        expect(as()).toBeTruthy()
    });
    test('Prueba si coincide los precios totales y las cantidades de los conceptos', function() {
        function conceptos() {
            const concept = new Concepto({
                ClaveProdServ: '01010101',
                NoIdentificacion: 'AULOG001',
                Cantidad: '5',
                ClaveUnidad: 'H87',
                Unidad: 'Pieza',
                Descripcion: 'Aurriculares USB Logitech',
                ValorUnitario: '350.00',
                Importe: '1750.00',
                Descuento: '175.00',
            });
            concept.traslado({
                Base: '1575.00',
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: '252.00',
            });

            return concept.validate();
        }

        expect(!conceptos().isFail).toBeTruthy()
    });

});
