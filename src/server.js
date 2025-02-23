// CommonJs => require (padrão de importação)
//const http = require('hhtp');
//ESModule => import/export (não suporta por padrão, precisa adicionar o type no package.json)
import http from 'node:http';
import { json } from './middlewares/json.js';
import { Routes } from './routes.js'

const server = http.createServer(async(req, res) => {
    const { method, url} = req 
    await json(req, res)

    const route = Routes.find(route => {
        return route.method === method && route.path === url
    })

    if(route) {
        return route.handler(req, res)
    }

    res.statusCode = 404
    return res.end()

})

server.listen(3000, () => {
  console.log('Server running on port 3000');
})