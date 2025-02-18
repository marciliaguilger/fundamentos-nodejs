// CommonJs => require (padrão de importação)
//const http = require('hhtp');

//ESModule => import/export (não suporta por padrão, precisa adicionar o type no package.json)
import http from 'node:http';

const users = []

const server = http.createServer((req, res) => {
    const { method, url} = req 
    console.log(method, url)

    if (method === 'GET' && url ==='/users'){
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
    
    if (method === 'POST' && url ==='/users'){
        users.push({
            id: 1,
            name: 'Harry Potter',
            email: 'harry@gmail.com'
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