var mysql = require('mysql');
var conne = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'fiction'
});

conne.connect(function (err) {
    if (err) {
        console.log("数据库打开失败");
        return;
    }
    console.log("数据库开启成功");
})

// conne.query("select * from type",function(err,rows){
//     if(err){
//         console.log("数据库查询失败");
//         return ;
//     }
//     console.log(rows);
// });

exports.getadd = function (obj, fun) {
    var books = exports.getmodify(obj);
    console.log(books);
    // for(var i=0;i<books.length;i++){
    aaaaa(0);
    function aaaaa(i) {

        var sql = "insert into books(typeid,name,author,descr,bookimg,url,state,addtime) value(" + books[i].tag + ",'" + books[i].name + "','" + books[i].author + "','" + books[i].introduce + "','" + books[i].cover + "','" + books[i].url + "'," + books[i].status + ",'" + books[i].time + "')";
        // var arr = [,,,,,,,];
        // console.log(sql);
        conne.query(sql, function (err, rows) {
            if (err) {
                console.log("数据添加失败");
                return;
            }
            console.log("数据添加成功");
            i++;
            if (i < books.length) {
                aaaaa(i);
            } else {
                return;
            }
        });
        return;

    }


}

exports.getmodify = function (obj) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].status == "连载中") {
            obj[i].status = 1;
        } else {
            obj[i].status = 2;
        }
        switch (obj[i].tag) {
            case "都市青春":
                obj[i].tag = 6;
                break;
            case "都市小说":
                obj[i].tag = 6;
                break;
            case "都市生活":
                obj[i].tag = 6;
                break;
            case "都市言情":
                obj[i].tag = 6;
                break;
            case "异界大陆":
                obj[i].tag = 7;
                break;
            case "言情女生":
                obj[i].tag = 12;
                break;
            case "女频频道":
                obj[i].tag = 13;
                break;
            case "现代情感":
                obj[i].tag = 11;
                break;
            case "言情小说":
                obj[i].tag = 12;
                break;
            case "玄幻奇幻":
                obj[i].tag = 4;
                break;
            case "玄幻魔法":
                obj[i].tag = 13;
                break;
            case "玄幻小说":
                obj[i].tag = 4;
                break;
            case "武侠仙侠":
                obj[i].tag = 5;
                break;
            case "修真小说":
                obj[i].tag = 5;
                break;
            case "科幻灵异":
                obj[i].tag = 8;
                break;
            case "灵异奇谈":
                obj[i].tag = 8;
                break;
            case "侦探推理":
                obj[i].tag = 8;
                break;
            case "科幻小说":
                obj[i].tag = 8;
                break;
            case "网游竞技":
                obj[i].tag = 7;
                break;
            case "网游小说":
                obj[i].tag = 7;
                break;
            case "古装迷情":
                obj[i].tag = 12;
                break;
            case "现代情感":
                obj[i].tag = 11;
                break;
            case "穿越重生":
                obj[i].tag = 10;
                break;
            case "历史军事":
                obj[i].tag = 12;
                break;
            default:
                obj[i].tag = 84;
        }
        if (!obj[i].author) {
            obj[i].author = "无名氏";
        }

    }
    return obj;
}

exports.getBookType = function(fun){
    var sql = "select * from type";
    conne.query(sql,function(err,result){
        if(err){
            console.log("数据获取失败");
            return;
        }
    
        fun(result);
    });
}
exports.getBooks = function(fun){
    var sql = "select  books.id id,typeid tid, books.name booksname,books.descr,books.author,books.state,books.bookimg picture,type.name typename  from books left join type on books.typeid=type.id";
    conne.query(sql,function(err,rows){
        if(err){
            console.log("数据获取失败");
            return;
        }
        fun(rows);
    });
}
exports.getBookscata = function(id,fun){
    var sql = "select * from books where id="+id;
    conne.query(sql,function(err,rows){
        if(err){
            console.log("数据获取失败");
            return;
        }
        fun(rows);
    });
}
exports.getBookshelf = function(fun){
    var sql = "select * from bookshelf where userid=1";
    conne.query(sql,function(err,rows){
        if(err){
            console.log("数据获取失败");
            return;
        }
        // fun(rows);
        var sql2 = "select * from bookshelf left join books on bookshelf.bookid = books.id "
        conne.query(sql2,function(err2,rows2){
            if(err2){
                console.log("数据获取失败");
                return;
            }
            fun(rows2);
        })
    });
}




exports.addUser =  function(post,fun){
    let sql = 'insert into users values(?,?,?,?,?,?,?,?,?)';
    let parmar = [null,post.name,post.username,post.passwd,null,post.email,100,post.state,post.addtime];
    conne.query(sql,parmar,function(err,result){
        if(err){
            console.log('数据添加失败!');
            return ;
        }
        fun(result);
    })
}

exports.getUser = function(username,fun){
    let sql = 'select * from users where username='+username+'';
    // console.log(sql);
    conne.query(sql,function(err,result){
        if(err){
            console.log('数据搜索失败!');
            return ;
        }
        fun(result);
    })
}


// conne.end(function(){
//     console.log("关闭数据库");
// })