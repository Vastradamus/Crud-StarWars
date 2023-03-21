console.log('May Node be with you')
const express = require('express')
const bodyParser = require('body-parser') //trebalo bi da moze i bez ovoga
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://Vasa:QDhI34oYI8VIyByz@cluster11.tf3awez.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended: true})) //trebalo bi da moze i bez ovoga
    app.get('/', (req,res) => {
        quotesCollection.find().toArray()
            .then(results => {
                console.log(results)
            })
            .catch(error => console.error(error))
        res.sendFile(__dirname + '/index.html')
    })
    app.post('/quotes', (req, res)=> {
       quotesCollection.insertOne(req.body)
       .then(result => {
        console.log(result)
        res.redirect('/')
       })
       .catch(error => console.error(error))
    })
    app.listen(3000, function(){
        console.log('listening on 3000')
    })
    

  })
  .catch(error => console.error(error))








