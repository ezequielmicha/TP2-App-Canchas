const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/califications');

router.get('/:id', async (req, res) => {
  console.log("Trayendo las calificaciones de una cancha por Id");
  res.json(await controller.getCalificationsByCourtId(req.params.id));
});

router.get('/size/:size', async (req, res) => {
  console.log("Trayendo las calificaciones de una cancha por tamaño");
  res.json(await controller.getCalificationsBySize(req.params.size));
});

router.put('/', async (req, res)=>{
    console.log("Añadiendo una calificacion a una cancha");
    try {
      res.send(await controller.addCalification(req.body));
    } catch (error) {
      res.send(error.message);
    }
});

module.exports = router;