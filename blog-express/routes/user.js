var express = require('express');
var router = express.Router();

const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resmodel')

/* GET home page. */
router.post('/login', function (req, res, next) {
    const {username, password} = req.body
    console.log(req.body,'dddddddddddd');
    const result = login(username, password)
    return result.then(data => {
        console.log(data,'ssssssssssssss');
        if (data.username) {


            req.session.username = data.username
            req.session.realname = data.realname

            // data['cookieId'] = req.sessionId
            // set(req.sessionId,req.session)
            res.json(
                new SuccessModel(data)
            )
            return
        }
        res.json(
            new ErrorModel('登陆失败')
        )
    })
});
router.get('/login-test', (req, res, next) => {
    if(req.session.username){
        res.json(
            {
                code:0,
                msg:'成功'
            }
        )
        return
    }
    res.json({
        code:-1,
        msg:'为登陆'
    })
})
router.get('/session-test', (req, res, next) => {
    const session = req.session;
    if (session.viewNum == null) {
        session.viewNUm = 0;
    }
    session.viewNum++
    res.json({
        viewNum: session.viewNum
    })
})

module.exports = router;
