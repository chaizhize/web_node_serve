const {SuccessModel,ErrorModel} = require('../model/resmodel')

const {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog} = require('../controller/blog')

//统一登陆验证函数

const loginCheck =  (req) => {
        if(!req.session.username){
            return Promise.resolve(new ErrorModel('未登陆'))

            // return Promise.resolve(
            //     new SuccessModel({
            //         username:req.session
            //     })
            // )
        }

}

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id || ''
    //博客列表接口
    if(method === 'GET' && req.path === '/api/blog/list'){
        let {id = '', title = '', content ='', author = '',} = req.query

        if(req.query.isadmin){
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult){
                return loginCheckResult
            }
            author = req.session.realname
        }

        const result = getBlogList(req.query,author)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })

    }
    //博客详情接口
    if(method === 'GET' && req.path === '/api/blog/details'){
        const result = getBlogDetail(id)
        if(result){
            return result.then(blogDetail=>{
                return new SuccessModel(blogDetail)
            })
        }
    }
    //新建博客接口
    if(method === 'POST' && req.path === '/api/blog/new'){
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }

        req.body.author = req.session.realname
        const result = newBlog(req.body)
        if(result){
            return result.then(data=>{
                return new SuccessModel(data)
            })
        }
    }

    if(method === 'POST' && req.path === '/api/blog/update'){
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }
        const result = updateBlog(id,req.body)
        return result.then(val=>{
            if(result){
                return new SuccessModel(val)
            }else {
                return new ErrorModel('更新博客失败')
            }
        })

    }

    if(method === 'POST' && req.path === '/api/blog/del'){
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }
        const author = req.session.username
        const result = delBlog(id,author)
        return result.then(val=>{
            if(result){
                return new SuccessModel(val)
            }else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
}
module.exports = handleBlogRouter
