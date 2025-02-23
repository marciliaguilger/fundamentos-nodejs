// CommonJs => require (padrão de importação)
//const http = require('hhtp');

//ESModule => import/export (não suporta por padrão, precisa adicionar o type no package.json)
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { json } from './middlewares/json.js';
import { Database } from './database.js';

const database = new Database

const server = http.createServer(async(req, res) => {
    const { method, url} = req 
    await json(req, res)

    if (method === 'GET' && url ==='/users'){
        const users = database.select('users')
        console.log(users)
        
        return res.end(JSON.stringify(users));
    }
    
    if (method === 'POST' && url ==='/users'){
        
        const {name, email} = req.body

        const user = {
            id: randomUUID(),
            name: name,
            email: email
        }

        database.insert('users', user)
        console.log('base')
        
        res.statusCode = 201
        return res.end()
    }
    
    return res
    .statusCode(404)
    .end()

})

server.listen(3000, () => {
  console.log('Server running on port 3000');
})