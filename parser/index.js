const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const validator = require('./validator');
const app = express();
const upload = multer();

app.use(cors());

app.post('/validate', upload.single('record'), (req, res) => {
  validator.validate(req.file.buffer).then(valid => {
    if (valid) {
      res.status(200).end('true');
    } else {
      res.status(200).end('false');
    }
  });
})

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});