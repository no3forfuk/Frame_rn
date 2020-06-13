const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))

app.post('/permssion/v1.0.0/user/login', (req, res, next) => {
    res.json({
        data: {
            companyId: 60
        },
        code: 0,
        msg: 'success'
    })
    next()
})
app.listen(9500, function () {
    console.log(`success! nodeServer listen port 9500`)
})
