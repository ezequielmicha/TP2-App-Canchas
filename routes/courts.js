const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/courts');

router.get('/', auth, async (req, res) => {
    console.log("Trayendo canchas");
    res.json(await controller.getCourts());
});

router.get('/:id', auth, async (req, res) => {
  console.log("Trayendo una cancha por Id");
  res.json(await controller.getCourtById(req.params.id));
});

router.get('/size/:size', auth, async (req, res) => {
  console.log("Trayendo canchas por tamaño");
  res.json(await controller.getCourtsBySize(req.params.size));
});

router.post('/', auth, async (req, res)=>{
    console.log("Creando una cancha");
    try {
      res.send(await controller.addCourt(req.body));
    } catch (error) {
      res.send(error.message);
    }
});

router.delete('/:id', auth, async (req, res)=>{
  console.log("Eliminando una cancha");
  try {
    await controller.deleteCourt(req.params.id);
    res.send("Cancha eliminada correctamente");
  } catch (error) {
    res.send(error.message);
  }
  
});

module.exports = router;