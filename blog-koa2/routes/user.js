const router = require('koa-router')()


const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resmodel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {username, password} = ctx.request.body
    const data = await login(username, password)
    if (data.username) {
        //设置session
        ctx.session.username = data.username
        ctx.session.realname = data.realname

        ctx.body = new SuccessModel(data)
        return
    }

    ctx.body = new ErrorModel('登陆失败')

    // return result.then(data => {
    //     console.log(data,'ssssssssssssss');
    //     if (data.username) {
    //
    //
    //         req.session.username = data.username
    //         req.session.realname = data.realname
    //
    //         // data['cookieId'] = req.sessionId
    //         // set(req.sessionId,req.session)
    //         res.json(
    //             new SuccessModel(data)
    //         )
    //         return
    //     }
    //     res.json(
    //         new ErrorModel('登陆失败')
    //     )
    // })
})

router.get('/session-test', async function (ctx, next) {
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0
    }
    ctx.session.viewCount++
    ctx.body = {
        code: 0,
        viewCount: ctx.session.viewCount
    }
})

module.exports = router
