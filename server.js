console.log('May Node be with you')
const express = require('express')
const bodyParser = require('body-parser') //trebalo bi da moze i bez ovoga
const app = express()

app.use(bodyParser.urlencoded({extended: true})) //trebalo bi da moze i bez ovoga

app.listen(3000, function(){
    console.log('listening on 3000')
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res)=> {
    console.log(req.body)
})