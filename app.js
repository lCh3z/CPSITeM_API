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
    data : [clients]

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
    data : [
      data = client
      ]
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
    data : [
      status = 'Se insertó correctamente'
    ]
  }

  res.send(json)
})
app.delete('/client/:id', (req, res) =>{
  const client = [{
    id : req.param('id')
  }];

  const json = {
    response : 'OK',
    data : [
      status = `'Se elimino a ${req.param('id')}`
      ]
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

app.listen(5555, () => console.log('Example app listening on port 5555!'))
