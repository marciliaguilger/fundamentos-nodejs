import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    // # => torna a proŕiedade privada
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => this.#database = JSON.parse(data))
            .catch(() => this.#persist())
    }

    #persist() {
        //por padrão o Node define o path padrão sendo o local onde o projeto está sendo executado.
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select (table) {
        const data = this.#database[table] ?? []
        return data
    }
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        }else {
            this.#database[table] = [data]
        }

        this.#persist();
        return data
    }
}