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

    select (table, search) {
        let data = this.#database[table] ?? []

        if(search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].includes(value)
                })
            })
        }

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

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if(rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist();
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        
        if(rowIndex > -1){
            this.#database[table][rowIndex] = { id, ...data}
            this.#persist();
        }
    }
}