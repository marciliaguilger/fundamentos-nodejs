export async function json(req, res) {
    const buffers = []
    
    //for await -> aguarda percorrer toda a stream para seguir para a próxima linha
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    
    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    }
    catch{
        req.body = null
    }

    res
        .setHeader('Content-type', 'application/json')
        //.end(JSON.stringify(req.body))
}