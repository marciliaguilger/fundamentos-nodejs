// CommonJs => require (padrão de importação)
//const http = require('hhtp');

//ESModule => import/export (não suporta por padrão, precisa adicionar o type no package.json)
import http from 'node:http';
import { json } from './middlewares/json.js';

const users = []

const server = http.createServer(async(req, res) => {
    const { method, url} = req 
    console.log(method, url)

    await json(req, res)

    if (method === 'GET' && url ==='/users'){
        return res
    }
    
    if (method === 'POST' && url ==='/users'){
        
        const {name, email} = req.body

        users.push({
            id: 1,
            name: name,
            email: email
        })
        return res
        .writeHead(201)
        .end()
    }
    
    return res
    .writeHead(404)
    .end()

})

server.listen(3000, () => {
  console.log('Server running on port 3000');
})