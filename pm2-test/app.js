const http = require('http')

const server = http.createServer((req, res) => {


    console.log('cur time', Date.now());
    console.error('出错了。。。', Date.now());

    if(req.url === '/err'){
        throw new Error('哈哈哈哈哈哈')
    }

    res.setHeader('Content-type','application/json')
    res.end(
        JSON.stringify({
            code:0,
            msg:'pm2 test server312321 2'
        })
    )
})
server.listen(8009)
