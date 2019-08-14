const PDFParser = require('pdf2json');


const signatures = [
  'CODIGO%20PESSOA',
  'NOME%20DA%20DISCIPLINA',
  'ALUNO',
  'UNIVERSIDADE%20DO%20VALE%20DO%20ITAJAI',
  'H%20I%20S%20T%20%C3%93%20R%20I%20C%20O%20%20%20E%20X%20T%20R%20A%20O%20F%20I%20C%20I%20A%20L',
];

function validate(pdfData) {
  
  return signatures.every(signature => pdfData.includes(signature));
}


function parseAndValidate(buffer) {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser();
    
    parser.on("pdfParser_dataReady", pdfData => {
      // fs.writeFileSync("./test.json", JSON.stringify(pdfData, '', 2));
      // console.log("Result written.")

      resolve(validate(JSON.stringify(pdfData)));
    });
    
    parser.on("pdfParser_dataError", err => {
      reject(err);
    })

    parser.parseBuffer(buffer);
  });
}

module.exports = {
  validate: parseAndValidate
};