import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database()

export const Routes = [
    {
        path: buildRoutePath('/users'),
        method: 'GET',
        handler: (req, res) => {
            const { search } = req.query

            const users = database.select('users', {
                name: search,
                email: search
            })
            
            return res.end(JSON.stringify(users));
        }
    },
    {
        path: buildRoutePath('/users'),
        method: 'POST',
        handler: (req, res) => {
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
    },
    {
        path: buildRoutePath('/users/:id'),
        method: 'DELETE',
        handler: (req, res) => {
            const { id } = req.params
            
            database.delete('users', id)
            
            res.statusCode = 204
            return res.end();
        }
    }
    ,
    {
        path: buildRoutePath('/users/:id'),
        method: 'PUT',
        handler: (req, res) => {
            const { id } = req.params
            const { name, email} = req.body

            database.update('users', id, { name, email})
            
            res.statusCode = 204
            return res.end();
        }
    }
]