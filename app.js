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

app.listen(5555, () => console.log('Example app listening on port 5555!'))
