const {SuccessModel,ErrorModel} = require('../model/resmodel')

const {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog} = require('../controller/blog')
const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id || ''
    //博客列表接口
    if(method === 'GET' && req.path === '/api/blog/list'){
        const {id = '', title = '', content ='', author = '',} = req.query
        const result = getBlogList(req.query)
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
        const result = newBlog(req.body)
        if(result){
            return result.then(data=>{
                return new SuccessModel(data)
            })
        }
    }

    if(method === 'POST' && req.path === '/api/blog/update'){
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
        const result = delBlog(id)
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
