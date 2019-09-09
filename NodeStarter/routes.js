const fs = require('fs')

const requestHandler = (req, res) =>{
    const { url, method } = req
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<form action="/test" method="POST"><input type="text" name="message"><button type="submit">send</button></form>')
        return res.end()
    }
    if( url === '/test' && method === 'POST'){
        const body = []
        req.on('data', chunk =>{
            console.log(chunk)
            body.push(chunk);
        })
        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end()
    }
}

module.exports = {
    handler: requestHandler,
    someText: 'some hard coded text'
}
