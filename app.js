const queryString = require('querystring')

const handlerBlogRouter = require('./src/router/blog')
const handlerUserRouter = require('./src/router/user')

const {get,set} = require('./src/db/reids')

const {access} = require('./src/utils/log')

let SESSION_DATA = {};

//获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    console.log(d.toGMTString(),'d.toGMTString()');
    return d.toGMTString()
}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json;charset=UTF-8') {
            resolve({})
            return
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        });
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const handlerServer = (req, res) => {

    // 记录access日志
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)


    //设置返回格式，JSON
    res.setHeader('Content-type', 'application/json')

    //获取path
    const url = req.url;
    req.path = url.split('?')[0]

    //获取query
    req.query = queryString.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) return;
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    //解析session

    // let needSetCookie = false;
    // let userId = req.cookie.userId;
    // if(userId){
    //     if(!SESSION_DATA[userId]){
    //         SESSION_DATA[userId] = {}
    //     }
    // }else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]
    // console.logs(req);

    let userId = req.cookie.userId
    let needSetCookie = false
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
        console.log('进来了')
    }


    //处理postData
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        console.log(sessionData,'sessionDatasessionData');
        if (sessionData == null) {
            // 设置redis的session
            set(req.sessionId, {})
            // 设置session
            req.session = {}
        } else {
            req.session = sessionData
        }

        // 处理 post 数据
        return getPostData(req)
    }).then(postData => {
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
        if (blogResult) {
            blogResult.then(blogData => {
                if(needSetCookie){
                    //操作cookie
                    res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //处理user路由
        const userData = handlerUserRouter(req, res)
        if (userData) {
            userData.then(userData => {
                res.setHeader('Set-Cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
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
