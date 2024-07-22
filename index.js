const http = require('http') ;
const fs = require('fs') ; 

const index = fs.readFileSync('index.html' ,'utf-8') ; 
const data = JSON.parse(fs.readFileSync('data.json' ,'utf-8')) ; 
const product = data.products ; 

const server = http.createServer((req,res)=>{
    console.log(req.url);
    
    switch(req.url){
    case '/' :
        res.setHeader('Content-Type', 'text/html');
        res.end(index) ; 
        break;
    case '/api' : 
        res.setHeader('Content-Type', 'application/json') ;
        res.end(JSON.stringify(data)) ;
        break ; 
    case '/product' : 
        res.setHeader('Content-Type', 'text/html') ;
        let modified= index.replace('**title**' , product.title).replace('**description**',product.description)
        res.end(modified) ;
        break ; 
    default:
        res.writeHead(404);
        res.end() ;         

    }   
})

server.listen(8080) ;  


