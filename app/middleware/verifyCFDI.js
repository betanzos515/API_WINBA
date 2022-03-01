const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray : false, mergeAttrs : true });

xmlValidation  = (req, res, next) => {
    let json = JSON.parse(JSON.stringify(req.body));
    let xmlBase64 = json.xml;
    let pdfBase64 = json.pdf;
    let data = {};
    if(xmlBase64 != ""){
        let buff = Buffer.from(xmlBase64, 'base64');
        let xml = buff.toString('ascii');

        parser.parseString(xml, function(error, result) {
            if(error === null){
                let jsonObj = JSON.parse(JSON.stringify(result))
                //let jsonKey = Object.keys(jsonObj);
                //let dataObj = jsonObj[jsonKey];
                let values = {};
                getValues(jsonObj, values);
                data = {
                    message: "CFDI Valido",
                    ruleCFDI1: ["Version", "OK", values.Version],
                    ruleCFDI2: ["Fecha", "OK", values.Fecha],
                    ruleCFDI3: ["Forma de Pago", "OK", values.FormaPago]
                };
            }
            else {
                data = {
                    message: "Error de lectura de XML"
                };
            }
        });
    }
    if(pdfBase64 != ""){
        //Nothing to do
    }
    res.status(200).send(data);

    next();
}
function getValues(jsonObj , values , node = '') {
    for(let obj in jsonObj) {
        if(jsonObj[obj] instanceof Object) {
            node = obj;
            getValues(jsonObj[obj], values, node);
            console.log(Object.keys(jsonObj[obj]));
        } else {
            if(node == 'cfdi:Comprobante' && obj == 'Version'){
                values[obj] = jsonObj[obj];
            }
            else if(node == 'cfdi:Comprobante' && obj == 'Fecha'){
                values[obj] = jsonObj[obj];
            }
            else if(node == 'cfdi:Comprobante' && obj == 'FormaPago'){
                values[obj] = jsonObj[obj];
            }
        };
    }
}
const verifyCFDI = {
    xmlValidation: xmlValidation,
  };
module.exports = verifyCFDI;