import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database()

export const Routes = [
    {
        path: buildRoutePath('/users'),
        method: 'GET',
        handler: (req, res) => {
            const users = database.select('users')
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

            const user = database.select('users').find(user => user.id === id)
            if (!user) {
                res.statusCode = 404
                return res.end()
            }

            return res.end(JSON.stringify(user));
        }
    }
]