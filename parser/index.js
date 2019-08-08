const fs = require('fs');
const PDFParser = require('pdf2json');
const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer();
const parser = new PDFParser();

function validate(pdfData) {
  const signatures = [
    'CODIGO%20PESSOA',
    'NOME%20DA%20DISCIPLINA',
    'ALUNO',
    'UNIVERSIDADE%20DO%20VALE%20DO%20ITAJAI',
    'H%20I%20S%20T%20%C3%93%20R%20I%20C%20O%20%20%20E%20X%20T%20R%20A%20O%20F%20I%20C%20I%20A%20L',
  ];

  return signatures.every(signature => pdfData.includes(signature));
}

parser.on("pdfParser_dataReady", pdfData => {
  fs.writeFileSync("./test.json", JSON.stringify(pdfData, '', 2));
  console.log("Result written.")
  console.log("Valid: ", validate(JSON.stringify(pdfData)))
});

// parser.loadPDF('./fake_grades.pdf');

app.post('/validate', upload.single('record'), (req, res) => {
  console.log(req.file);
  res.status(200);
})

app.listen(4000);