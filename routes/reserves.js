const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/reserves');

router.get('/', async (req, res) => {
  console.log("Trayendo reservas");
  res.json(await controller.getAllReserves());
});

router.get('/:id', async (req, res) =>{
  console.log("Listando reservas por usuario");
  try {
    res.send(await controller.getReservesByUser(req.params.id));
  } catch (error) {
    res.send(error.message);
  }
})

router.put('/addReserve', async (req, res) =>{
  console.log("Agregando reserva");
  try {
    res.send(await controller.addReserve(req.body));
  } catch (error) {
    res.send(error.message);
  }
})

router.post('/email/addReserve', async (req, res) =>{
  console.log("Agregando reserva");
  try {
    res.send(await controller.addReserveByEmail(req.body));
  } catch (error) {
    res.send(error.message);
  }
})

router.put('/deleteReserve', async (req, res) =>{
  console.log("Eliminando reserva");
  try {
    res.send(await controller.deleteReserve(req.body));
  } catch (error) {
    res.send(error.message);
  }
})

module.exports = router;