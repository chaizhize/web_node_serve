const queryString = require('querystring')

const handlerBlogRouter = require('./src/router/blog')
const handlerUserRouter = require('./src/router/user')

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        });
        req.on('data',()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const handlerServer = (req, res) => {
    //设置返回格式，JSON
    res.setHeader('Content-type', 'application/json')

    //获取path
    const url = req.url;
    req.path = url.split('?')[0]

    //获取query
    req.query = queryString.parse(url.split('?')[1])

    //处理postData
    getPostData(req).then(postData=>{
        req.body = postData
        //处理blog路由
        // const blogData = handlerBlogRouter(req, res)
        // if(blogData){
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }

        const blogResult = handlerBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //处理user路由
        const userData = handlerUserRouter(req, res)
        if (userData) {
             userData.then(userData=>{
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        //未匹配路由
        res.writeHead(404, {'Content-type': "text/plain"})
        res.write('404 Not Fount')
        res.end()
    })

}
module.exports = handlerServer
