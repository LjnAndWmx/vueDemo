const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
// Database Name
const dbName = 'mydatabase'

//1.导包
const express = require('express');
const bodyParser = require('body-parser')

//2.创建App
const app = express();

// parse application/x-www-form-urlencoded  只支持 usernname=lisi&password=lisi
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 只支持 "{username:'lisi',password:'lisi'}"
app.use(bodyParser.json())


//服务器端设置允许跨域
app.all('/*',(req,res,next)=>{
	//告诉浏览器一些额外信息
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("X-Powered-By",' 3.2.1')
	res.setHeader("Content-Type", "application/json;charset=utf-8");
	
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.setHeader("Access-Control-Expose-Headers", "*");
	
	next();
})

//3.路由处理

//GET登录请求处理
app.get('/api/login',(req,res)=>{
	const result = {status:1,message:"登录成功"}
	// 		/api/login?username=zhangsan&password=123
	if (req.query.username=='zhangsan' && req.query.password=='123'){
		
	}else{
		result.status = 0;
		result.message = "用户名或密码失败"
	}
	res.setHeader("Content-Type","text/json;charset=utf-8");
	res.json(result);
})

//POST登录请求处理
app.post('/api/postLogin',(req,res)=>{
	const result = {status:1,message:"登录成功"}
	if (req.body.username=='lisi' && req.body.password=='lisi'){
		
	}else{
		result.status = 0;
		result.message = "用户名或密码失败"
	}
	res.setHeader("Content-Type","text/json;charset=utf-8");
	res.json(result);
})

// 查询商品
app.get('/api/getbrandlist',(req,res)=>{
	MongoClient.connect(url,{useNewUrlParser: true},(err,client)=>{
	   const db = client.db(dbName)
	   const collection = db.collection(products)
	   collection.find().toArray((err,docs)=>{
			 client.close()
			 console.log(docs)
	   })
	})
})


// 商品添加
app.post('/api/addproduct',(req,res)=>{
	// const result = {status:1,message:'添加成功'}
	// Use connect method to connect to the server
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //    获取db对象
        const db = client.db(dbName);
        // 链接到相对应的集合
        const collection = db.collection(products);

        collection.insertOne(param, (err, result) => {
            client.close()
            if (result == null) {
				res.send("<script>alert('插入失败')</script>")
			  } else {
				res.send("<script>location.href='/branchnetworking/brand'</script>")
			  }
        })
    })
})

//4.启动
app.listen(6688,"127.0.0.1",err=>{
	console.log("start OK")
});
