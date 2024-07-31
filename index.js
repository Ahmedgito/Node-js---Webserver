const fs = require('fs');
const express = require('express') ; //add Express 
const { type } = require('os');
const morgan = require('morgan');

const index = fs.readFileSync('new.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products ; 

//making server in express
const server = express() ;

// Body Parser
server.use(morgan('default'))
server.use(express.json());
 server.use(express.static('public')) ; 

//Using Middlewares
    server.use((req,res,next)=>{
        console.log(req.method , req.ip , req.hostname)
        next()   // we use next function so middleware can move to the next endpoint
    })


// API - EndPoint - Route 

// Read GET /products 
server.get('/products' , (req , res) =>{ 
    res.json(products) ; 
})

//Read GET /product
server.get('/products/:id' , (req , res) =>{ 
    const id  = +req.params.id ; 
    const product = products.find(p=>p.id===id)
    res.json(product) ; 
})

// Create post Products
server.post('/products' , (req , res) =>{
    console.log(req.body) //rem to use body parsers.
    products.push(req.body)
    res.json(req.body) ; 
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