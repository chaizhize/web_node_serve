const fs = require('fs')
const path = require('path')
const readLine = require('readline')


const fullName = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readStrem = fs.createReadStream(fullName)

const rl = readLine.createInterface({
    input: readStrem
})

let chromeNum = 0
let sum = 0

//
rl.on('line', (lineData) => {
    if(!lineData){
        return
    }
    sum++

    const arr = lineData.split(' -- ')
    if(arr[2] && arr[2].indexOf('Chrome') > 0){
        chromeNum++
    }

})
rl.on('close',()=>{
    console.log('chrome +', chromeNum / sum )
})