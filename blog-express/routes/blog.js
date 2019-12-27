var express = require('express');
var router = express.Router();
const {SuccessModel,ErrorModel} = require('../model/resmodel')

const {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog} = require('../controller/blog')

const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.get('/list', function(req, res, next) {
    let {id = '', title = '', content ='', author = '',} = req.query

    if(req.query.isadmin){
        // const loginCheckResult = loginCheck(req)
        console.log(req.session.username,'ssdsdssd');
        if(req.session.username == null){
            res.json(
                new ErrorModel('未登陆')
            )
            return
        }
        author = req.session.realname
    }

    const result = getBlogList(req.query,author)
    return result.then(listData=>{
        res.json(
            new SuccessModel(listData)
        )
    })
});
router.get('/details', function(req, res, next) {

    const result = getBlogDetail(req.query.id)
    if(result){
        return result.then(blogDetail=>{
            res.json(
                new SuccessModel(blogDetail)
            )
        })
    }

});
router.post('/new', loginCheck, function(req, res, next) {
    req.body.author = req.session.realname
    const result = newBlog(req.body)
    if(result){
        return result.then(data=>{
            res.json(
                new SuccessModel(data)
            )
        })
    }

    // res.render('index', { title: 'Express' });
});
router.post('/update', function(req, res, next) {
    res.json({
        code:0,
        data:[1,2,3]
    })

    // res.render('index', { title: 'Express' });
});
router.post('/del', function(req, res, next) {
    res.json({
        code:0,
        data:[1,2,3]
    })

    // res.render('index', { title: 'Express' });
});

module.exports = router;
