const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/clients', (req, res) =>{
  const clients = [{
    id :1,
    name : 'Diego',
    photo : 'foto.jpeg',
    sec_name : 'Luis',
    par_surname : 'Quiñones',
    mat_surname : 'Guzmna',
    company : 'CocaCola',
    rfc : 'QUDL850321AD2',
    cfdi : 'archivo.xml',
    phone : 3387284657,
    business_name : 'LOS sanos',
    status : 1,
    list_email : [
      'sanoDiego@gmail.com ',
      'otro@hotmail.com',
    ],
    cdu : 'diego123',
    main_email : 'sanodiego@gmail.com',
  },
  {
    id :2,
    name : 'Diego',
    photo : 'foto.jpeg',
    sec_name : 'Luis',
    par_surname : 'Quiñones',
    mat_surname : 'Guzmna',
    company : 'CocaCola',
    rfc : 'QUDL850321AD2',
    cfdi : 'archivo.xml',
    phone : 3387284657,
    business_name : 'LOS sanos',
    status : 1,
    list_email : [
      'sanoDiego@gmail.com ',
      'otro@hotmail.com',
    ],
    cdu : 'diego123',
    main_email : 'sanodiego@gmail.com',
  }];
  const json = {
    response : 'OK',
    data : clients
  }

  res.send(json)
})
app.get('/client/:id', (req, res) =>{
  const client = [{
    id : req.param('id'),
    name : 'Diego',
    photo : 'foto.jpeg',
    sec_name : 'Luis',
    par_surname : 'Quiñones',
    mat_surname : 'Guzmna',
    company : 'CocaCola',
    rfc : 'QUDL850321AD2',
    cfdi : 'archivo.xml',
    phone : 3387284657,
    business_name : 'LOS sanos',
    status : 1,
    list_email : [
      'sanoDiego@gmail.com ',
      'otro@hotmail.com',
    ],
    cdu : 'diego123',
    main_email : 'sanodiego@gmail.com',
  }];

  const json = {
    response : 'OK',
    data : client
  }

  res.send(json)
})
app.post('/client', (req, res) => {
  const client = {
    main_email : req.param('email'),
    cda : req.param('password'),
  }

  // Validar entrada

  //Insertar en Client

  //Insertar en Emails

  const json = {
    response : 'OK',
    message : 'Se insertó correctamente'
  }

  res.send(json)
})
app.delete('/client/:id', (req, res) =>{
  const client = [{
    id : req.param('id')
  }];

  const json = {
    response : 'OK',
    message : `Se elimino a ${req.param('id')}`
  }

  res.send(json)
})

app.patch('/client/:id', (req, res) => {
  const client = {
    name : req.param('name'),
    photo : req.param('photo'),
    sec_name : req.param('sec_name'),
    par_surname : req.param('mat_surname'),
    mat_surname : req.param('mat_surname'),
    company : req.param('company'),
    rfc : req.param('rfc'),
    cfdi : req.param('cfdi'),
    phone : req.param('phone'),
    business_name : req.param('business_name'),
    status : req.param('status'),
    list_email : req.param('list_email'),
    cdu : req.param('cdu'),
    main_email : req.param('main_email'),
  }
  //Validaciones

  //SQL

  const json = {
    response : 'OK',
    data : client
  }

  res.send(json)
})

app.get('/users', (req, res) =>{
  const users = [{
    id : 1,
    photo : 'foto.jpeg',
    name : 'Alondra',
    sec_name : 'Viviana',
    pat_surname : 'Barbosa',
    mat_surname : 'Martinez',
    rfc : 'BAMA21059543A',
    phone : 3375930476,
    status : 1,
    cdu : 'Peluche',
    main_email : 'viviana@gmail.com',
    type : 1,
    position : 'DEVELOPER',
    depart : 'Development'
  },{
    id : 2,
    photo : 'foto.jpeg',
    name : 'Alondra',
    sec_name : 'Viviana',
    pat_surname : 'Barbosa',
    mat_surname : 'Martinez',
    rfc : 'BAMA21059543A',
    phone : 3375930476,
    status : 2,
    cdu : 'Peluche',
    main_email : 'viviana@gmail.com',
    type : 1,
    position : 'DEVELOPER',
    depart : 'Development'
  }]
  const json = {
    response : 'OK',
    data : users
  }
  res.send(json)
})

app.get('/user/:id', (req, res) =>{
  const user = [{
    id : req.param('id'),
    photo : 'foto.jpeg',
    name : 'Alondra',
    sec_name : 'Viviana',
    pat_surname : 'Barbosa',
    mat_surname : 'Martinez',
    rfc : 'BAMA21059543A',
    phone : 3375930476,
    status : 1,
    cdu : 'Peluche',
    main_email : 'viviana@gmail.com',
    type : 1,
    position : 'DEVELOPER',
    depart : 'Development'
  }]
  const json = {
    response : 'OK',
    data : user
  }
  res.send(json)
})

app.patch('/user/:id', (req, res) => {
  const user = {
    photo : req.param('photo'),
    name : req.param('name'),
    sec_name : req.param('sec_name'),
    pat_surname : req.param('pat_surname'),
    mat_surname : req.param('mat_surname'),
    rfc : req.param('rfc'),
    phone : req.param('phone'),
    status : req.param('status'),
    cdu : req.param('password'),
    main_email : req.param('email'),
    type : req.param('type'),
    position : req.param('position'),
    depart : req.param('depart')
  }

  // Validar entrada

  //Update en Client

  //Update en Emails

  const json = {
    response : 'OK',
    message : `Se actualizó correctamente a ${req.param('name')}`
  }

  res.send(json)
})


app.post('/user', (req, res) => {
  const user = {
    photo : req.param('photo'),
    name : req.param('name'),
    sec_name : req.param('sec_name'),
    pat_surname : req.param('pat_surname'),
    mat_surname : req.param('mat_surname'),
    rfc : req.param('rfc'),
    phone : req.param('phone'),
    status : req.param('status'),
    cdu : req.param('password'),
    main_email : req.param('email'),
    type : req.param('type'),
    position : req.param('position'),
    depart : req.param('depart')
  }

  // Validar entrada

  //Insertar en Client

  //Insertar en Emails

  const json = {
    response : 'OK',
    message : `Se insertó correctamente a ${req.param('name')}`
  }

  res.send(json)
})

app.delete('/user/:id', (req, res) => {


  // Validar entrada

  //Update on Client to status 0

  const json = {
    response : 'OK',
    message : `Se deshabilitó al usuario ${req.param('id')}`
  }

  res.send(json)
})
//////////////////////////////////////////////////////////////////////
app.get('/listEmails', (req, res) =>{
  const listEmail = [{
    id : 1,
    id_user : 1,
    email : 'primer@gmail.com'
  },{
    id : 1,
    id_user : 2,
    email : 'segundo@gmail.com'
  }]
  const json = {
    response : 'OK',
    data : listEmail
  }
  res.send(json)
})
app.get('/listEmail/:id', (req, res) =>{
  const listEmail = [{
    id : req.param('id'),
    id_user : 1,
    email : 'primer@gmail.com'
  }]
  const json = {
    response : 'OK',
    data : listEmail
  }
  res.send(json)
})

app.patch('/listEmail/:id', (req, res) =>{
  const listEmail = {
    id : req.param('id'),
    id_user : req.param('id_user'),
    email : req.param('email')
  }

  const json = {
    response : 'OK',
    data : listEmail,
    message: `Se actualizó correctamente ${req.param('id')}`
  }
  res.send(json)
})

app.post('/listEmail', (req, res) =>{
  const lsitEmail = {
    id : req.param('id'),
    id_user : req.param('id_user'),
    email : req.param('email')
  }
  const json = {
    response : 'OK',
    message : `Se insertó correctamente ${req.param('id')}`
  }

  res.send(json)
})
app.delete('/listEmail/:id', (req, res)=>{
  const json = {
    response : 'OK',
    message :  `Se deshabilitó lista de email ${req.param('id')}`
  }
  res.send(json)
})

//////////////////////////////////////////////////////////////////////
app.get('/wishlists',(req,res)=>{
  const wishlists = [{
    id_user : 1,
    id_product : 1,

  },{
    id_user : 2,
    id_product : 1,
  }]

  const json = {
    response : 'OK',
    data : wishlists
  }
  res.send(json)
})

app.get('/wishlist/:id_user', (req, res)=>{
  const wishlist = [{
    id_user : req.param('id_user'),
    id_product : 1,
  }]
  const json = {
    response : 'OK',
    data : wishlist
  }
  res.send(json)
})

app.post('/wishlist', (res, req)=>{
  const wishlist = {
    id_user : req.param('id_user'),
    id_product : req.param('id_product'),
  }
  const json = {
    response : 'OK',
    message : `Insertado el articulo ${req.param('id_product')} para ${req.param('id_user')}`
  }
  res.send(json)
})

app.delete('/wishlist/:id_user', (req, res)=>{
  const wishlist = {
    id_user : req.param('id_user'),
    id_product : req.param('id_product'),
  }
  const json = {
    response : 'OK',
    message : `Eliminado el articulo ${req.param('id_product')} para ${req.param('id_user')}`
  }
  res.send(json)
})


//////////////////////////////////////////////////////////////////////
app.get('/carts', (req, res)=>{
  const carts =[{
    id : 1,
    id_product : 1,
    quantity : 5
  },{
    id : 1,
    id_product : 2,
    quantity : 2
  }]
  const json = {
    response : 'OK',
    data : carts
  }
  res.send(carts)
})
app.get('/cart/:id', (req, res)=>{
  const cart =[{
    id : req.param('id'),
    id_product : 1,
    quantity : 5
  },{
    id : 1,
    id_product : 2,
    quantity : 2
  }]
  const json = {
    response : 'OK',
    data : cart
  }
  res.send(cart)
})

app.patch('/cart/:id', (req, res) =>{
  const cart = {
    id : req.param('id'),
    id_product : req.param('id_product'),
    quantity : req.param('quantity')
  }
  const json = {
    response : 'OK',
    data : cart,
    message : `Se actualizó correctamente a ${req.param('id')}`
  }
  res.send(cart)
})
app.post('/cart',(req, res)=>{
  const cart = {
    id : req.param('id'),
    id_product : req.param('id_product'),
    quantity : req.param('quantity')
  }
  const json = {
    response : 'OK',
    data : cart,
    message : `Se insertó correctamente a ${req.param('id')}`
  }
  res.send(cart)
})

app.delete('/cart/:id',(req,res)=>{
  const json = {
    response : 'OK',
    message : `Se deshabilitó al usuario ${req.param('id')}`

  }
  res.send(json)
})

app.get('/products', (req, res) =>{
  const products = [{
    id : 1,
    id_cat : 1,
    name : 'Pancho',
    price : 12312,
    status : 4,
    discount : 12312,
    inventory : 12,
    description : 'Está chido',
    specs : 'Tiene pantalla',
    min_quan : 15,
    date : Date.now()
  },
  {
    id : 2,
    id_cat : 2,
    name : 'MARIO',
    price : 12312,
    status : 4,
    discount : 12312,
    inventory : 12,
    description : 'Está chido',
    specs : 'Tiene pantalla',
    min_quan : 15,
    date : Date.now()
  }];
  const json = {
    response : 'OK',
    data : products

  }

  res.send(json)
})

app.get('/product/:id', (req, res) =>{
  const product = {
    id : 1,
    id_cat : 1,
    name : 'Pancho',
    price : 12312,
    status : 4,
    discount : 12312,
    inventory : 12,
    description : 'Está chido',
    specs : 'Tiene pantalla',
    min_quan : 15,
    date : Date.now()
  }

  const json = {
    response : 'OK',
    data : product
  }

  res.send(json)
})
app.post('/product', (req, res) => {
  const product = {
    id_cat : req.param('id_cat'),
    name : req.param('name'),
    price : req.param('name'),
    status : req.param('status'),
    discount : req.param('discount'),
    inventory : req.param('inventory'),
    description : req.param('description'),
    specs : req.param('specs'),
    min_quan : req.param('min_quan'),
    date : req.param('date')
  }

  // Validar entrada

  //Insertar en Client

  //Insertar en Emails

  const json = {
    response : 'OK',
    message : `Insertado el producto ${req.param('name')}`
  }

  res.send(json)
})
app.delete('/product/:id', (req, res) =>{
  const product = [{
    id : req.param('id')
  }];

  const json = {
    response : 'OK',
    message : `Se elimino a ${req.param('id')}`
  }

  res.send(json)
})

app.patch('/product/:id', (req, res) => {
  const product = {
    id : req.param('id'),
    id_cat : req.param('id_cat'),
    name : req.param('name'),
    price : req.param('name'),
    status : req.param('status'),
    discount : req.param('discount'),
    inventory : req.param('inventory'),
    description : req.param('description'),
    specs : req.param('specs'),
    min_quan : req.param('min_quan'),
    date : req.param('date')
  }
  //Validaciones

  //SQL

  const json = {
    response : 'OK',
    message : `Modificado el producto ${req.param('name')}`
  }

  res.send(json)
})
app.get('/listProd/:id_order', (req,res)=>{
  const listProd = {
    id_order :  req.param('id_order'),
    id_product : 1,
    quantity : 7,
    price : 12000,
    date : Date.now()
  }
  const json = {
    response : 'OK',
    data : listProd
  }
  res.send(json)
})
app.patch('/listProd/:id_order',(req,res)=>{
  const listProd = {
    id_order :  req.param('id_order'),
    id_product : req.param('id_product'),
    quantity : req.param('quantity'),
    price : req.param('price'),
    date : req.param('date')
  }
  const json = {
    response : 'OK',
    data : listProd,
    message : `Se actualizó correctamente a ${req.param('id_order')}`
  }
  res.send(json)
})
app.post('/listProd/',(req,res)=>{
  const listProd = {
    id_order :  req.param('id_order'),
    id_product : req.param('id_product'),
    quantity : req.param('quantity'),
    price : req.param('price'),
    date : req.param('date')
  }
  const json = {
    response : 'OK',
    data : listProd,
    message : `Se insertó correctamente a ${req.param('id_order')}`

  }
  res.send(json)
})
app.delete('listProd/:id_order',(req,res)=>{
  const json = {
    response : 'OK',
    message : `Se deshabilitó la orden ${req.param('id_order')}`
  }
  res.send(json)
})
//////////////////////////////////////////////////////////////////////
app.get('/services',(req,res)=>{
  const services = [{
    id : 1,
    id_seller : 1,
    id_client : 1,
    hospital : 'Hospital 46',
    status : 1,
    date :  Date.now(),
    type   : 'tipo',
    equipment : 'Equipo bueno',
    model : 'modelo 1',
    serial : 'serial 123',
    location : 'location',
    contract : 1,
    description : 'Descripcion del servicio',
    voucher : 'voucher del servicio'
  },{
    id : 2,
    id_seller : 1,
    id_client : 1,
    hospital : 'Hospital 46',
    status : 1,
    date :  Date.now(),
    type   : 'tipo',
    equipment : 'Equipo bueno',
    model : 'modelo 2',
    serial : 'serial 546',
    location : 'Ubicacion',
    contract : 1,
    description : 'Descripcion del servicio y detalla',
    voucher : 'voucher del servicio'
  }]

  const json = {
    response : 'OK',
    data : services
  }
  res.send(json)
})
app.get('/service/:id',(req,res)=>{
  const service = [{
    id : req.param('id'),
    id_seller : 1,
    id_client : 1,
    hospital : 'Hospital 46',
    status : 1,
    date :  Date.now(),
    type   : 'tipo',
    equipment : 'Equipo bueno',
    model : 'modelo 1',
    serial : 'serial 123',
    location : 'location',
    contract : 1,
    description : 'Descripcion del servicio',
    voucher : 'voucher del servicio'
  }]

  const json = {
    response : 'OK',
    data : service
  }
  res.send(json)
})
app.patch('/service/:id',(req,res)=>{
  const service = [{
    id : req.param('id'),
    id_seller : req.param('id_seller'),
    id_client : req.param('id_client'),
    hospital : req.param('hospital'),
    status : req.param('status'),
    date :  req.param('date'),
    type   : req.param('type'),
    equipment : req.param('equipment'),
    model : req.param('model'),
    serial : req.param('serial'),
    location : req.param('loscation'),
    contract : req.param('contract'),
    description : req.param('description'),
    voucher : req.param('voucher')
  }]

  const json = {
    response : 'OK',
    data : service,
    message : `Se actualizó correctamente ${req.param('id')}`

  }
  res.send(json)
})
app.post('/service',(req,res)=>{
  const service = [{
    id : req.param('id'),
    id_seller : req.param('id_seller'),
    id_client : req.param('id_client'),
    hospital : req.param('hospital'),
    status : req.param('status'),
    date :  req.param('date'),
    type   : req.param('type'),
    equipment : req.param('equipment'),
    model : req.param('model'),
    serial : req.param('serial'),
    location : req.param('loscation'),
    contract : req.param('contract'),
    description : req.param('description'),
    voucher : req.param('voucher')
  }]

  const json = {
    response : 'OK',
    data : service,
    message : `Se insertó correctamente ${req.param('id')}`

  }
  res.send(json)
})
app.delete('/service/:id',(req,res)=>{
  const json = {
    response : 'OK',
    message : `Se deshabilitó el servicio ${req.param('id')}`
  }
  res.send(json)
})
//////////////////////////////////////////////////////////////////////
app.get('/orders',(req,res)=>{
  const orders = [{
    id : 1,
    id_user : 1,
    id_address : 1,
    id_payment :1,
    id_cuppon : 'XMAS',
    date : Date.now(),
    status :1
  },{
    id : 2,
    id_user : 2,
    id_address : 2,
    id_payment :2,
    id_cuppon : 'XMAS',
    date : Date.now(),
    status :1
  }]
  const json = {
    response : 'OK',
    data : orders
  }
  res.send(json)
})
app.get('/order/:id',(req,res)=>{
  const order = {
    id : 1,
    id_user : 1,
    id_address : 1,
    id_payment :1,
    id_cuppon : 'XMAS',
    date : Date.now(),
    status :1
  }
  const json = {
    response : 'OK',
    data : order
  }
  res.send(json)
})
app.patch('/order/:id',(req,res)=>{
  const order = {
    id : req.param('id'),
    id_user : req.param('id_user'),
    id_address : req.param('id_address'),
    id_payment :req.param('id_payment'),
    id_cuppon : req.param('id_cuppon'),
    date : req.param('date'),
    status : req.param('status')
  }
  const json = {
    response : 'OK',
    data : order,
    message : `Se actualizó correctamente ${req.param('id')}`

  }
  res.send(json)
})
app.post('/order',(req,res)=>{
  const order = {
    id : req.param('id'),
    id_user : req.param('id_user'),
    id_address : req.param('id_address'),
    id_payment :req.param('id_payment'),
    id_cuppon : req.param('id_cuppon'),
    date : req.param('date'),
    status : req.param('status')
  }
  const json = {
    response : 'OK',
    data : order,
    message : `Se insertó correctamente ${req.param('id')}`

  }
  res.send(json)
})
app.delete('/order/:id',(req,res)=>{
  const json = {
    response : 'OK',
    message : `Se deshabilitó la orden ${req.param('id')}`
  }
  res.send(json)
})
//////////////////////////////////////////////////////////////////////
app.get('/statServices',(req,res)=>{
  const statServices = [{
    id : 1,
    id_service : 1,
    title : 'titulo',
    description : 'Descripcion',
    materials : 'materiales usados',
    observations : 'observaciones'
  },{
    id : 2,
    id_service : 2,
    title : 'titulo',
    description : 'Descripcion',
    materials : 'materiales usados',
    observations : 'observaciones'
  }]
  const json = {
    response : 'OK',
    data : statServices
  }
  res.send(json)
})
app.get('/statService/:id',(req,res)=>{
  const statService = {
    id : req.param('id'),
    id_service : 1,
    title : 'titulo',
    description : 'Descripcion',
    materials : 'materiales usados',
    observations : 'observaciones'
  }
  const json = {
    response : 'OK',
    data : statService
  }
  res.send(json)
})
app.patch('/statService/:id',(req,res)=>{
  const statService = {
    id : req.param('id'),
    id_service : req.param('id_service'),
    title : req.param('title'),
    description : req.param('description'),
    materials : req.param('materials'),
    observations : req.param('observations')
  }
  const json = {
    response : 'OK',
    data : statService,
    message : `Se actualizó correctamente a ${req.param('id')}`

  }
  res.send(json)
})
app.post('/statService',(req,res)=>{
  const statService = {
    id : req.param('id'),
    id_service : req.param('id_service'),
    title : req.param('title'),
    description : req.param('description'),
    materials : req.param('materials'),
    observations : req.param('observations')
  }
  const json = {
    response : 'OK',
    data : statService,
    message : `Se insertó correctamente a ${req.param('id')}`

  }
  res.send(json)
})
app.delete('/statService/:id',(req,res)=>{
  const json = {
    response : 'OK',
    message : `Se deshabilitó la orden ${req.param('id_order')}`
  }
  res.send(json)
})
//////////////////////////////////////////////////////////////////////

app.get('/imgStatServs', (req,res)=>{
  const imgStatServs = [{
    id_stat_serv : 1,
    photo : 'IMAGEN O FOTO'
  },{
    id_stat_serv : 2,
    photo : 'IMAGEN O FOTO'
  }]
  const json = {
    response : 'OK',
    data : imgStatServs
  }
  res.send(json)
})

<<<<<<< HEAD
app.get('/imgStatServ/:id_stat_serv', (req,res)=>{
  const imgStatServ = {
    id_stat_serv : req.param('id_stat_serv'),
    photo : 'IMAGEN O FOTO'
  }
  const json = {
    response : 'OK',
    data : imgStatServ
  }
  res.send(json)
})
app.patch('/imgStatServ/:id', (req,res)=>{
  const imgStatServ = {
    id_stat_serv : req.param('id_stat_serv'),
    photo : req.param('photo')
  }
  const json = {
    response : 'OK',
    data : imgStatServ,
    message : `Se actualizó correctamente a ${req.param('id_stat_serv')}`
  }
  res.send(json)
})
app.post('/imgStatServ', (req,res)=>{
  const imgStatServ = {
    id_stat_serv : req.param('id_stat_serv'),
    photo : req.param('photo')
  }
  const json = {
    response : 'OK',
    data : imgStatServ,
    message : `Se insertó correctamente a ${req.param('id_stat_serv')}`
  }
  res.send(json)
})
app.delete('/imgStatServ/:id_stat_serv', (req,res)=>{
  const json = {
    response : 'OK',
    message : `Se deshabilitó la orden ${req.param('id_stat_serv')}`
  }
  res.send(json)
})
=======

app.get('/notifications', (req, res) =>{
  const notifications = [{
    id : 1,
    title : 'Servicio finalizado',
    cont : 'Ya estuvo',
    id_user : 2,
    date : Date.now(),
    prog : ('prog'),
    status : false
  },
  {
    id : 3,
    title : 'Servicio finalizado 2131 ',
    cont : 'Ya estuvo 213',
    id_user : 2,
    date : Date.now(),
    prog : ('prog'),
    status : false
  }];
  const json = {
    response : 'OK',
    data : notifications
  }

  res.send(json)
})

app.get('/notification/:id', (req, res) =>{
  const notification = {
    id : req.param('id'),
    title : 'Servicio finalizado',
    cont : 'Ya estuvo',
    id_user : 2,
    date : Date.now(),
    prog : ('prog'),
    status : false
  }

  const json = {
    response : 'OK',
    data : notification
  }

  res.send(json)
})

app.post('/notification', (req, res) => {
  const notification = {
    title : req.param('title'),
    cont : req.param('cont'),
    id_user : req.param('id_user'),
    date : req.param('date'),
    prog : req.param('prog'),
    status : req.param('status')
  }

  // Validar entrada

  //Insertar en Client

  //Insertar en Emails

  const json = {
    response : 'OK',
    message : `Insertado la notificación ${req.param('name')}`
  }

  res.send(json)
})
app.delete('/notification/:id', (req, res) =>{
  const product = [{
    id : req.param('id')
  }];

  const json = {
    response : 'OK',
    message : `Se elimino a ${req.param('id')}`
  }

  res.send(json)
})

app.patch('/notification/:id', (req, res) => {
  const notification = {
    id : req.param('id'),
    title : req.param('title'),
    cont : req.param('cont'),
    id_user : req.param('id_user'),
    date : req.param('date'),
    prog : req.param('prog'),
    status : req.param('status')
  }
  //Validaciones

  //SQL

  const json = {
    response : 'OK',
    message : `Modificada la notificación ${req.param('id')}`
  }

  res.send(json)
})


app.get('/newslists', (req, res) =>{
  const newslists = [{
    email : 'miclo@velka.com',
    status : true
  },
  {
    email : 'cruz@candelaria',
    status : true
  }];
  const json = {
    response : 'OK',
    data : newslists
  }

  res.send(json)
})

app.get('/newslist/:email', (req, res) =>{
  const newslist = {
    email : req.param('email'),
    status : false,
  }

  const json = {
    response : 'OK',
    data : newslist
  }

  res.send(json)
})

app.post('/newslist', (req, res) => {
  const newslist = {
    email : req.param('email'),
    status : req.param('status')
  }

  // Validar entrada

  //Insertar en Client

  //Insertar en Emails

  const json = {
    response : 'OK',
    message : `Insertado el elemento ${req.param('email')}`
  }

  res.send(json)
})

app.delete('/newslist/:email', (req, res) =>{
  const newslist = [{
    email : req.param('email')
  }];

  const json = {
    response : 'OK',
    message : `Se elimino a ${req.param('email')}`
  }

  res.send(json)
})

app.patch('/newslist/:email', (req, res) => {
  const newslist = {
    email : req.param('email'),
    status : req.param('status')
  }
  //Validaciones

  //SQL

  const json = {
    response : 'OK',
    message : `Modificado el elemento ${req.param('email')}`
  }

  res.send(json)
})

>>>>>>> dev
app.listen(5555, () => console.log('Example app listening on port 5555!'))
