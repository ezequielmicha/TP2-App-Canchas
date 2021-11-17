const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/users');

router.get('/', auth, async (req, res) => {
    console.log("Trayendo usuarios");
    res.json(await controller.getUsers());
});

router.get('/:id', auth, async (req, res) => {
  res.json(await controller.getUserById(req.params.id));
});

router.get('/email/:email', auth, async (req, res) => {
  console.log("Trayendo usuario por Email");
  res.json(await controller.getUserByEmail(req.params.email));
});

router.post('/', auth, async (req, res)=>{
    console.log("Creando un usuario");
    try {
      res.send(await controller.addUser(req.body));
    } catch (error) {
      res.send(error.message);
    }
});

router.delete('/:id', auth, async (req, res)=>{
  console.log("Eliminando un usuario");
  try {
    await controller.deleteUser(req.params.id);
    res.send("Usuario eliminado correctamente");
  } catch (error) {
    res.send(error.message);
  }
  
});

router.put('/', auth, async (req, res) =>{
  console.log("Actualizando usuario");
  try {
    res.send(await controller.updateUser(req.body));
  } catch (error) {
    res.send(error.message);
  }
})

router.post('/login', async (req, res)=>{
    try {
      const user = await controller.findUserByCredential(req.body.email, req.body.password);
      const token = await controller.generateToken(user);
  
      res.send({user, token});    
    } catch (error) {
      res.status(401).send(error.message);
    }
  });

// router.put('/addReserve', async (req, res) =>{
//   console.log("Agregando reserva");
//   try {
//     res.send(await controller.addReserve(req.body));
//   } catch (error) {
//     res.send(error.message);
//   }
// })

// router.get('/reserves/:id', async (req, res) =>{
//   console.log("Listando reservas por usuario");
//   try {
//     res.send(await controller.getReservesByUser(req.params.id));
//   } catch (error) {
//     res.send(error.message);
//   }
// })

// router.get('/r/allReserves', async (req, res) => {
//   console.log("Trayendo reservas");
//   res.json(await controller.getAllReserves());
// });

// router.put('/deleteReserve', async (req, res) =>{
//   console.log("Eliminando reserva");
//   try {
//     res.send(await controller.deleteReserve(req.body));
//   } catch (error) {
//     res.send(error.message);
//   }
// })

module.exports = router;
