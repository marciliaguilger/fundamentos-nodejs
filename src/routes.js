import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

const database = new Database()

export const Routes = [
    {
        path: '/users',
        method: 'GET',
        handler: (req, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users));
        }
    },
    {
        path: '/users',
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
]