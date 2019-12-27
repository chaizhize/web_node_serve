const {ErrorModel} = require('../model/resmodel')


module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(
        new ErrorModel('未登陆！')
    )
}
