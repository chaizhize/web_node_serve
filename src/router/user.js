const {login} = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../model/resmodel')
const {set} = require('../db/reids')


const handleUserRouter = (req, res) => {
    const method = req.method;

    if(method === 'POST' && req.path === '/api/user/login'){
        const {username,password} = req.body
        const result = login(username,password)
        return result.then(data=>{
            if(data.username){
                req.session.username = data.username
                req.session.realname = data.realname
                data['cookieId'] = req.sessionId
                console.log(req.session,'req.sessionreq.sessionreq.sessionreq.session');
                set(req.sessionId,req.session)
                return new SuccessModel(data)
            }

            return new ErrorModel('登陆失败')
        })

    }

    //登陆测试
    // if( method === 'GET' && req.path === "/api/user/login-test"){
    //     if(req.session.username){
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 username:req.session
    //             })
    //         )
    //     }
    //     return Promise.resolve(new ErrorModel('未登陆'))
    // }


}
module.exports = handleUserRouter
