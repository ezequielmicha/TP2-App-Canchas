const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/users');

router.get('/', async (req, res) => {
    console.log("Trayendo usuarios");
    res.json(await controller.getUsers());
});

router.get('/:id', async (req, res) => {
  res.json(await controller.getUserById(req.params.id));
});

router.get('/email/:email', async (req, res) => {
  console.log("Trayendo usuario por Email");
  res.json(await controller.getUserByEmail(req.params.email));
});

router.post('/', async (req, res)=>{
    console.log("Creando un usuario");
    try {
      res.send(await controller.addUser(req.body));
    } catch (error) {
      res.send(error.message);
    }
});

router.delete('/:id', async (req, res)=>{
  console.log("Eliminando un usuario");
  try {
    await controller.deleteUser(req.params.id);
    res.send("Usuario eliminado correctamente");
  } catch (error) {
    res.send(error.message);
  }
  
});

router.put('/', async (req, res) =>{
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

module.exports = router;
