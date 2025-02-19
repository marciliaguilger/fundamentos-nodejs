import http from 'node:http'
import { Transform } from 'node:stream'

class InverseStream extends Transform {
    _transform(chunk, encoding, callback) {
       const transformed = Number(chunk.toString()) * -1

       console.log(transformed)
       callback(null, Buffer.from(String(transformed)))
    }
}

//req => readable stream
//res => writable stream

const server = http.createServer(async (req, res) => {
    const buffers = []
    
    //for await -> aguarda percorrer toda a stream para seguir para a próxima linha
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    
    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    return res.end(fullStreamContent)
    // return req
    //     .pipe(new InverseStream())
    //     .pipe(res)
})

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})