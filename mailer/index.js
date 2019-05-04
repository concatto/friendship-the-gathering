var fs = require("fs")
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fernandoconcatto@gmail.com',
        pass: 'WorldRevolution2'
    }
});

let data = JSON.parse(fs.readFileSync("./caelondia.json"));

const promises = data.map(item => {
    const mailOptions = {
        from: 'fernandoconcatto@gmail.com',
        to: 'fernandoconcatto@gmail.com',
        subject: item.subject,
        html: item.content
    };

    return transporter.sendMail(mailOptions);
})

Promise.all(promises).then(results => {
    console.log(results);
}).catch(err => {
    console.log(err);
});


