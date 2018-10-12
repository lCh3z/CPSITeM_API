USE CPSITeM;

CREATE TABLE _User_(
  id integer unsigned not null,
  photo varchar(124),
  name varchar(16),
  sec_name varchar(16),
  pat_surname varchar(34),
  mat_surname varchar(32),
  company varchar(84),
  rfc varchar(13) unique,
  cfdi boolean,
  country varchar(5),
  lada varchar(3),
  phone varchar(8) unique,
  type varchar(8),
  cdu varchar(124),
  main_email varchar(84) unique,
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE _Worker_(
  id_user integer unsigned not null,
  position varchar (32),
  depart varchar(32),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE  _ListEmail_(
  id_user integer unsigned not null,
  email varchar(84),
  status tinyint unsigned default 2,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE _WishList_(
  id_user integer unsigned not null,
  id_product integer unsigned not null,
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE  _Cart_(
  id_user integer unsigned not null,
  id_product integer unsigned,
  quantity smallint unsigned,
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table _Order_(
  id integer unsigned not null,
  id_user integer unsigned not null,
  id_address integer unsigned not null,
  id_payment integer unsigned not null,
  id_cuppon integer unsigned not null,
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE _ListProd_ (
  id_order integer unsigned,
  id_product integer unsigned,
  quantity integer unsigned,
  price bigint unsigned,
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE _Service_(
  id integer unsigned not null,
  id_seller integer unsigned not null,
  id_user integer unsigned not null,
  title varchar (84),
  hospital varchar (84),
  type varchar(10),
  equipment varchar (50),
  model varchar (32),
  serial varchar (16),
  location varchar (25),
  contract integer unsigned,
  description varchar (6000),
  voucher varchar (124),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table _Product_(
  id integer unsigned not null,
  id_cat integer unsigned not null,
  name varchar (64) unique,
  price bigint,
  discount smallint,
  inventory integer,
  description varchar (10000),
  specs varchar (1024),
  min_quan smallint,
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE _Notification_(
  id integer unsigned not null,
  title varchar (32),
  cont varchar (4096),
  id_user integer unsigned not null,
  prog datetime,
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table _NewsList_(
  email varchar (84),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE _StatService_(
  id integer unsigned not null,
  id_service integer unsigned not null,
  title varchar (64),
  description varchar (4096),
  materials varchar (2048),
  observations varchar (2048),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table _ImgStatServ_(
  id_stat_serv integer unsigned not null,
  photo varchar (124),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table _Category_(
  id integer unsigned not null,
  name varchar (32),
  description varchar (1024),
  photo varchar(124),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE _ImgProduct_(
  id_prod integer unsigned,
  photo varchar(124),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE _Cuppon_(
  id integer unsigned,
  code varchar (32) not null,
  discount smallint unsigned,
  start datetime,
  end datetime,
  description varchar (2048),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table _Address_(
  id integer unsigned not null,
  id_user integer unsigned not null,
  name varchar (48),
  street varchar (48),
  colony varchar (48),
  city varchar(48),
  state varchar (21),
  out_numb smallint,
  int_num smallint,
  zip_code varchar(5),
  phone varchar (17),
  email varchar (84),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


create table _Payment_(
  id integer unsigned not null,
  id_user integer unsigned not null,
  account varchar (2048),
  token varchar (128),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE _Configuration_(
  label varchar(32),
  value varchar(2048),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE _Section_(
  id smallint unsigned not null,
  type tinyint unsigned,
  title varchar(60),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table _ConfSection_(
  id_section Smallint unsigned not null,
  photo varchar (84),
  title varchar(60),
  subtitle varchar (60),
  description varchar(256),
  status tinyint unsigned default 1,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


alter table _Section_ modify column id smallint unsigned auto_increment primary key;
alter table _ConfSection_ add foreign key (id_section) references _Section_ (id);

alter table _Cuppon_ modify column id integer unsigned auto_increment primary key;

alter table _Category_ modify column id integer unsigned auto_increment primary key;
alter table _Product_ modify column id integer unsigned auto_increment primary key, add foreign key (id_cat) references _Category_ (id);

alter table _User_ modify column id integer unsigned auto_increment primary key;
alter table _Address_ modify column id integer unsigned auto_increment primary key, add foreign key (id_user) references _User_ (id);
alter table _ListEmail_  add foreign key(id_user) references _User_ (id);
alter table _Payment_ modify column id integer unsigned auto_increment primary key, add foreign key (id_user) references _User_ (id);
alter table _Notification_ modify column id integer unsigned auto_increment primary key, add foreign key(id_user) references _User_ (id);
alter table _WishList_ add foreign key(id_user) references _User_ (id), add foreign key(id_product) references _Product_ (id);

alter table _Worker_  add foreign key(id_user) references _User_ (id);
alter table _Service_ modify column id integer unsigned auto_increment primary key, add foreign key(id_seller) references _User_ (id), add foreign key(id_user) references _User_ (id);
alter table _StatService_ modify column id integer unsigned auto_increment primary key, add foreign key(id_service) references _Service_ (id);
alter table _ImgStatServ_ add foreign key(id_stat_serv) references _StatService_ (id);

alter table _ImgProduct_ add foreign key(id_prod) references _Product_ (id);
alter table _Cart_  add foreign key(id_user) references _User_ (id), add foreign key(id_product) references _Product_ (id);
alter table _Order_ modify column id integer unsigned auto_increment primary key, add foreign key (id_user) references _User_ (id), add foreign key (id_address) references _Address_ (id), add foreign key (id_cuppon) references _Cuppon_ (id), add foreign key (id_payment) references _Payment_ (id);
alter table _ListProd_ add foreign key(id_order) references _Order_(id), add foreign key(id_product) references _Product_ (id);



INSERT INTO _User_ SET name='Luis', sec_name='Angel', type='ADMIN', main_email='luis@gmail.com';
INSERT INTO _User_ SET name='Pedro', sec_name='José', type='SELLER', main_email='pedro@gmail.com';
INSERT INTO _User_ SET name='Mario', sec_name='Eduardo', type='CLIENT', main_email='mario@gmail.com';

INSERT INTO _Category_ SET name='Ventiladores', description='some description...';
INSERT INTO _Category_ SET name='Monitores', description='some description...';
INSERT INTO _Category_ SET name='Componentes', description='some description...';

insert into _ListEmail_ set id_user=1, email='luis@gmail.com', status=2;
insert into _ListEmail_ set id_user=1, email='luis2@gmail.com', status=1;
insert into _ListEmail_ set id_user=2, email='pedro@gmail.com', status=2;
insert into _ListEmail_ set id_user=3, email='mario@gmail.com', status=2;

insert into _Address_ set id_user=1, name='My home';
insert into _Address_ set id_user=2, name='My home';
insert into _Address_ set id_user=3, name='My home';

insert into _Payment_ set id_user=1, token='AAABBBCCC';
insert into _Payment_ set id_user=2, token='AAABBBCCC';
insert into _Payment_ set id_user=3, token='AAABBBCCC';

insert into _Cuppon_ set code='GGEZ';
insert into _Cuppon_ set code='TEST';
insert into _Cuppon_ set code='FREE';

insert into _Product_ set name='Vent', id_cat=1;
insert into _Product_ set name='Vent2', id_cat=1;
insert into _Product_ set name='Vent3', id_cat=1;
insert into _Product_ set name='Screen3', id_cat=2;
insert into _Product_ set name='Screen2', id_cat=2;
insert into _Product_ set name='Tornillo', id_cat=3;


insert into _Worker_ set id_user=1, position='BOSS', depart='BUSSINES';
insert into _Worker_ set id_user=2, position='CEO', depart='RELAT';

insert into _Service_ set id_user=3, id_seller=1, hospital='TEST';
insert into _Service_ set id_user=3, id_seller=1, hospital='TEST2';
insert into _Service_ set id_user=3, id_seller=1, hospital='TEST3';

insert into _StatService_ set id_service=1, title='Testing status post';
insert into _StatService_ set id_service=1, title='Testing status post';
insert into _StatService_ set id_service=1, title='Testing status post';

insert into _ImgStatServ_ set id_stat_serv=1, photo='p1.jpg';
insert into _ImgStatServ_ set id_stat_serv=1, photo='p2.jpg';
insert into _ImgStatServ_ set id_stat_serv=1, photo='p3.jpg';
insert into _ImgStatServ_ set id_stat_serv=2, photo='p1.jpg';
