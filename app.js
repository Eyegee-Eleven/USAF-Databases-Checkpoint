const fs = require("fs")
const bodyParser = require("body-parser")

const express = require('express')
const app = express()
const port = 3001
const knex = require('knex')(require('./knexfile.js')['development']);


app.use(express.json())

app.get('/emails', (req, res) => {
    knex('emails')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({
            message: `There was an error`
        }))
})

app.get('/emails/:id', (req, res ) => {
    knex('emails')
        .where({id: req.params.id})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({
            message: `There was an error`
        }))
})

//"subject": "Standup meeting"

app.get('/search', (req,res) =>{
    const query = req.query.subject;
 
knex('emails')
.where(`subject`, 'like', `%${query}%`)
.then(data => res.status(200).json(data))
.catch(err => res.status(404).json({
    message: `There was an error`
}))
})


app.post('/send', (req, res) => {
    const email = req.body;
    if(email.sender && email.recipient && email.subject && email.message) {
        knex('emails')
        .insert({
            sender: email.sender,
            recipient: email.recipient,
            subject: email.subject,
            message: email.message,
        }).returning('*')
        .then(data => res.status(201).json(data))
        .catch(err => res.status(401).json({message: `There is a problem with your body: ${email}`}))
    }
})




/* app.post('/send',function(req,res){
    let result;
    const emailSender = req.body;
    if(emailSender.sender && emailSender.recipient && emailSender.subject && emailSender.message){
        emails.push({ sender: emailSender.sender, recipient: emailSender.recipient, subject: emailSender.subject, email: emailSender.message, })

        result = {
            "status": "success",
            "message": "The message was successfully sent"
        }
    }else{ 
        result = {
            "status": "failed",
            "message": "The message was not sent"
        }
        res.status(400);
    }

    res.json(result);
}); */


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))