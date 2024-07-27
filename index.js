const fs = require('fs');
const express = require('express') ; //add Express 
const { type } = require('os');

const index = fs.readFileSync('new.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products ; 

//making server in express
const server = express() ;

//Using Middlewares
server.use((req,res,next)=>{
    console.log(req.method , req.ip , req.hostname)
    next()   // we use next function so middleware can move to the next endpoint
})

const Auth = ((req,res,next) =>{
    console.log() ;
    if (req.query.password) {
    } else {
        res.sendStatus(401)
    }
    next() ; 
})

server.use(Auth);

// API - EndPoint - Route 
server.get('/' , (req , res) =>{ 
    res.json({type:'GET'})
})
server.post('/' , (req , res) =>{
    res.json({type:'POST'})
})
server.delete('/' , (req , res) =>{
    res.json({type:'DELETE'})
})
server.put('/' , (req , res) =>{
    res.json({type:'PUT'})
})




server.get('/demo' , (req , res)=>{
//    res.sendStatus(404)  // can be used to send status as a response  res.sendStatus(404).send('<h1>Custom text resposne</h1>') ;
    res.json(products) // used to send json file in a response 
//    res.send(''<h1>hello</h1>) can be used to send a custom response 
//    res.sendFile('D:/NODE JS & MONGO DB/Node js/nodejs/new.html') ; used to send a file in response
})

//starts server
server.listen(8080 , ()=>{
    console.log('Server Started on Port 8080')
}) ; 