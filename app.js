const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

// app.get('/users', (req, res) => {
//   const users = [
//     {
//       id : 1,
//       name : 'Juan',
//       email : 'juan@correo.com'
//     },
//     {
//       id : 2,
//       name : 'Juan2',
//       email : 'juan2@correo.com'
//     },
//     {
//       id : 3,
//       name : 'Juan3',
//       email : 'juan3@correo.com'
//     }
//   ]
//   res.send(users)
// });

app.get('/users', (req, res) => {
  const users = [
    {
      id : 1,
      name : 'Juan',
      email : 'juan@correo.com'
    },
    {
      id : 2,
      name : 'Juan2',
      email : 'juan2@correo.com'
    },
    {
      id : 3,
      name : 'Juan3',
      email : 'juan3@correo.com'
    }
  ]

const json = {
  response : "OK",
  data : users,
  total : 2
}

  res.send(json)
});

app.get('/users/:userID', (req, res) => {
  const user =
    {
      id : req.params.userID,
      name : 'Juan' + req.params.userID,
      email : 'juan'+req.params.userID+'@correo.com'
    }

  res.send(user)
});

app.post('/users', (req,res) => {
  const json = {
    status : "OK",
    data : {
      name : req.params.name,
      email : req.params.email
    }
  }
  res.send(json)
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
