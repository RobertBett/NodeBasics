const fs = require('fs')

const requestHandler = (req, res) =>{
    const { url, method } = req
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<div><h1>Welcome</h1><h3>Everything is Fine</h3></div>')
        res.write('<form action="/test" method="POST"><input type="text" name="message"><button type="submit">send</button></form>')
        return res.end()
    }
    if(url === '/users'){
        res.write('<div><h1>user</h1></div>')
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
        res.setHeader('Location', '/users');
        return res.end()
    }
}

module.exports = {
    handler: requestHandler,
    someText: 'some hard coded text'
}
