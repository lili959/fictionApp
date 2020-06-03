let path = require("path");
let express = require('express');
let app = express();
const md5 = require('md5-node');
let hbs = require('hbs');
let querystring = require("querystring");
let mysql = require("./src/mysql/mysql.js");
app.set("port",process.env.PORT || 8080);


app.post("/home",function(req,res){
    // console.log('找到路由了');
    // res.end("打开了");
    let post = ""
    req.on('data',function(data){
        post += data;
    });
    req.on('end',function(){
        post = querystring.parse(post);
        // console.log(post);
        post = JSON.parse(post.json);
        // console.log(post);
        mysql.getadd(post.list);
    });
});

app.get("/bookType",function(req,res){

    res.header("Access-Control-Allow-Origin", "*");
    res.writeHead(200,{"Content-type":"application/json"});
    mysql.getBookType(function(rows){
        res.end(JSON.stringify(rows));
        // console.log(rows);
        
    })
});
app.get("/getBooks",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.writeHead(200,{"Content-type":"application/json"});
    mysql.getBooks(function(rows){
        res.end(JSON.stringify(rows));
    })
});
app.get("/bookscata/:id",function(req,res){
    let id = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    res.writeHead(200,{"Content-type":"application/json"});
    // console.log(id);
    mysql.getBookscata(id,function(rows){
        // console.log(rows);
        res.end(JSON.stringify(rows));
    })
});



app.get("/bookshelf",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.writeHead(200,{"Content-type":"application/json"});
    mysql.getBookshelf(function(rows){
        res.end(JSON.stringify(rows));
    })
});



app.get('/login',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    let username = req.query.username;
    let passwd = req.query.passwd;
    mysql.getUser(username,function(result){
        if(result.length == 0){
            res.end(JSON.stringify({code:0}));
        }else{
            if(passwd == md5(result[0].passwd)){
                res.end(JSON.stringify({code:1}));
            }else{
                res.end(JSON.stringify({code:0}));
            }
        }
    });
})

app.get('/myter/:username',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    // console.log(req.params.username);
    let username = req.params.username;
    mysql.getUser(username,function(result){
        result[0].passwd = md5(result[0].passwd);
        res.end(JSON.stringify(result));
    });
});

app.post('/registers',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    let post = '';
    req.on('data',function(data){
        post += data;
    })
    req.on('end',function(){
        post = querystring.parse(post);
        post.state = 1;
        post.addtime = new Date().toLocaleDateString();
        mysql.addUser(post,function(result){
            result = JSON.stringify(result);
            res.end(result);
        });
    })
})


app.listen(app.get('port'),function(){
    console.log("开车了！！"+app.get('port'));
})