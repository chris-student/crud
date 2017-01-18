console.log('May Node be with you');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://app:oCNxicRsMwCpCd2PIDwb@ds055842.mlab.com:55842/star-wars-quotes', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})

app.use(bodyParser.urlencoded({extended: true}))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    console.log("Serving " + __dirname + "\\index.html")
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was 'D:\Dropbox (Personal)\Code\JavaScript\crud' for this app.
})
// Note: request and response are usually written as req and res respectively.

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
    // console.log(req.body)
})