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

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))


app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {quotes: result})
    })
})


app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})


app.put('/quotes', (req, res) => {
    // Handle put request
    db.collection('quotes').findOneAndUpdate(
        {
            name: 'Yoda'
        },
        {
          $set: {
              name: req.body.name,
              quote: req.body.quote
          }
        },
        {
            sort: {_id:-1},
            upsert: true
        },
        (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        }
    )
})

app.delete('/quotes', (req, res) => {
    // Handle delete event
    db.collection('quotes').findOneAndDelete(
        {
            name: req.body.name
        },
        (err, result) => {
            if (err) return res.send(500, err)
            res.send('A darth vadar quote got deleted')
        }
    )
})