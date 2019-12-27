const redis = require('redis')

//创建客户端

const redisClient = redis.createClient(6379,'127.0.0.1');

redisClient.on('error',err=>{
    console.log(err);
})

redisClient.set('myName','zhangsan',redis.print);
redisClient.get('myName',(err,val)=>{

    if(err){
        console.log(err);
        return
    }
    console.log(val,'xxx');

    redisClient.quit()
})