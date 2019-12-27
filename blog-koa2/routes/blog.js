const router = require('koa-router')()

const {SuccessModel,ErrorModel} = require('../model/resmodel')

const loginCheck = require('../middleware/loginCheck')

const {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  delBlog} = require('../controller/blog')

router.prefix('/api/blog')

router.get('/list', async function  (ctx, next) {
  let {id = '', title = '', content ='', author = ''} = ctx.query

  if(ctx.query.isadmin){
    // const loginCheckResult = loginCheck(req)
    console.log(ctx.session.username,'ssdsdssd');
    if(ctx.session.username == null){
      ctx.body = new ErrorModel('未登陆')
      // res.json(
      //     new ErrorModel('未登陆')
      // )
      return
    }
    author = ctx.session.realname
  }

  const listData = await getBlogList(ctx.query,author)
  ctx.body = new SuccessModel(listData)
  // return result.then(listData=>{
  //   res.json(
  //       new SuccessModel(listData)
  //   )
  // })

  // ctx.body = {
  //   code:0,
  //   msg:'列表'
  // }
})
router.get('/details', async function(ctx, next) {

  const blogDetail = await getBlogDetail(ctx.query.id)
  ctx.body = new SuccessModel(blogDetail)
  // if(result){
  //   return result.then(blogDetail=>{
  //     res.json(
  //         new SuccessModel(blogDetail)
  //     )
  //   })
  // }

});

router.post('/new', loginCheck,async function(ctx, next) {
  const body = ctx.request.body
  body.author = ctx.session.realname
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
  // if(result){
  //   return result.then(data=>{
  //     res.json(
  //         new SuccessModel(data)
  //     )
  //   })
  // }

  // res.render('index', { title: 'Express' });
});

module.exports = router
