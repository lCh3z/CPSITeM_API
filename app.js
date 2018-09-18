const express = require('express')
const app = express()

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
    data :[users]
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
    data :[
      data = user
    ]
  }
  res.send(json)
})

app.patch('/user', (req, res) => {
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
    data : [
      status = `Se actualizó correctamente a ${req.param('name')}`
    ]
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
    data : [
      status = `Se insertó correctamente a ${req.param('name')}`
    ]
  }

  res.send(json)
})

app.delete('/user/:id', (req, res) => {


  // Validar entrada

  //Update on Client to status 0

  const json = {
    response : 'OK',
    data : [
      status = `Se deshabilitó al usuario ${req.param('id')}`
    ]
  }

  res.send(json)
})



app.listen(5555, () => console.log('Example app listening on port 5555!'))
