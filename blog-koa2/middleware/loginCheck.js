const {ErrorModel} = require('../model/resmodel')


module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next()
        return
    }
    ctx.body = new ErrorModel('未登陆！')
    // res.json(
    //     new ErrorModel('未登陆！')
    // )
}
