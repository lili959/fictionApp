create table users(
    id int unsigned not null auto_increment primary key,
    username varchar(32) not null unique,
    name varchar(16) not null,
    face varchar(32) ,
    pass char(32) not null,
    sex tinyint(1) not null,
    address varchar(255),
    phone varchar(11),
    email varchar(50),
    state tinyint(1) ,
    addtime varchar(32)
    );
create table books(
    id int unsigned not null auto_increment primary key,
    typeid int not null,
    name varchar(16) not null,
    author varchar(32) ,
    descr text not null,
    vipbook tinyint(1) not null,
    bookimg text,
    num double(6,2),
    url text,
    state tinyint(1) ,
    addtime varchar(32)
    );

create table type(
    id int unsigned not null auto_increment primary key,
    name varchar(16) not null,
    pid int not null
);
create table bookshelf(
    id int unsigned not null auto_increment primary key,
    userid int not null,
    bookid int not null,
    state tinyint(1),
    addtime varchar(32)
);

insert into type values
(null,"男生",0),
(null,"女生",0),
(null,"出版",0),
(null,"奇幻玄幻",1),
(null,"武侠修仙",1),
(null,"都市生活",1),
(null,"游戏动漫",1),
(null,"科幻悬疑",1),
(null,"仲裁豪门",2),
(null,"穿越架空",2),
(null,"现代言情",2),
(null,"古代言情",2),
(null,"魔幻情缘",2),
(null,"畅销小说",3),
(null,"人文社科",3),
(null,"经管励志",3),
(null,"教育教辅",3),
(null,"名家传记",3),
(null,"儿童文学",3);
insert into type values
(null,"热血",4),
(null,"复仇",4),
(null,"重生",4),
(null,"废柴",4),
(null,"奇遇",5),
(null,"练功",5),
(null,"丹药",5),
(null,"凡人",5),
(null,"系统",6),
(null,"校花",6),
(null,"赚钱",6),
(null,"逆袭",6),
(null,"竞技",7),
(null,"宅男",7),
(null,"同人",7),
(null,"搞笑",7),
(null,"玄学",8),
(null,"技术",8),
(null,"天才",8),
(null,"鬼怪",8),
(null,"豪门",9),
(null,"霸宠",9),
(null,"契约",9),
(null,"总裁",9);
insert into type values
(null,"异世",10),
(null,"翻身",10),
(null,"女强",10),
(null,"王爷",10),
(null,"婚恋",11),
(null,"职场",11),
(null,"校园",11),
(null,"黑帮",11),
(null,"宅斗",12),
(null,"宫斗",12),
(null,"种田",12),
(null,"女尊",12),
(null,"妖精",13),
(null,"仙侣",13),
(null,"萌宠",13),
(null,"美男",13),
(null,"影视",14),
(null,"青春",14),
(null,"军事",14),
(null,"历史",14),
(null,"养生",15),
(null,"法律",15),
(null,"哲学",15),
(null,"宗教",15),
(null,"心理",16),
(null,"职场",16),
(null,"理财",16),
(null,"口才",16),
(null,"应试",17),
(null,"英语",17),
(null,"科普",17),
(null,"励志",17),
(null,"名著",18),
(null,"诗歌",18),
(null,"国学",18),
(null,"传记",18),
(null,"童话",19),
(null,"寓言",19),
(null,"启蒙",19),
(null,"成长",19);


(null,typid,name,author,descr,vipbook,bookimg,null,num,state,addtime)
insert into books values

insert into books(typeid,name,author,descr,bookimg,url,status,addtime) value(12,'斗破苍穹之熏儿','无名氏','在看《斗破苍穹》的时候就要在有些不明白为什么古元的年龄那么大为什么他的女儿年龄那么小和一些其
他的方面不理解。比如熏儿到底怎么去萧家的，发身了什么和云韵在花宗，和萧…','https://www.x23qb.com/files/article/image/161/161191/161191s.jpg','qbxshttps://www.x23qb.com/book/161191/',1,'2019-12-04')

insert into bookshelf values
(null,1,34,0,"2019-1-1"),
(null,1,44,0,"2019-1-1"),
(null,1,67,0,"2019-1-1"),
(null,1,89,0,"2019-1-1"),
(null,1,132,0,"2019-1-1"),
(null,1,354,0,"2019-1-1"),
(null,1,666,0,"2019-1-1"),
(null,1,155,0,"2019-1-1"),
(null,1,176,0,"2019-1-1"),
(null,1,466,0,"2019-1-1"),
(null,1,452,0,"2019-1-1"),
(null,1,286,0,"2019-1-1"),
(null,1,384,0,"2019-1-1");