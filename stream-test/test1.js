
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, 'data.txt');
const fileName2 = path.resolve(__dirname, 'data-bak.txt');

const readStream = fs.createReadStream(fileName)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream)

readStream.on('data', (chunk)=>{
    console.log(chunk.toString(),'2232');
    // console.logs('copy done');
})

readStream.on('end', (err)=>{
    console.log('copy done');
})
//
// const http = require('http')
// const server = http.createServer((req,res)=>{
//     if(req.method === "POST"){
//         req.pipe(res)
//     }
// })
// server.listen(8009)


//标准输入输出
// process.stdin.pipe(process.stdout)