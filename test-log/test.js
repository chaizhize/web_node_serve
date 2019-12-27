const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, 'data.txt');
//写入文件内容
const content = '这是新内容'
const opt = {
    // a 追加写入
    // w 覆盖写入
    flag: 'a',
}
fs.writeFile(fileName, content, opt, (err) => {
    if(err){
        console.log(err);
        return
    }
})

//判断文件是否存在
fs.exists(fileName, (exists)=>{
    console.log(exists);
})

//读取文件内容
fs.readFile(fileName, (err, data)=>{
    if(err){
        console.log(err);
        return
    }
    //data是二进制，需转换
    console.log(data.toString());
})