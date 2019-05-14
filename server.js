const express = require('express');
const app = express();
const { validateStudentInfo, validatePublickey, validateDocumentRequest } = require('./utils/validate');
const port = process.env.PORT || 5000;

app.use(express.urlencoded());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('hahaha');
});

app.post('/request', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    var validateValue = validateStudentInfo(data.studentName, data.studentId);
    if (validateValue === 0) {
        return res.send('success');
    }
    res.send(validateValue);
});

app.post('/pubKey', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    if(validatePublickey(data.pubKey)) {
        if (validateDocumentRequest(data.diploma, data.transcript)) {
            res.send('success');
        } else {
            res.send('err2');
        }
    } else {
        res.send('err1');
    }
});

app.listen(port, () => {
    console.log(`server starting on port ${port}`);
});