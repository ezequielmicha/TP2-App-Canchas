const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const controller = require('../controllers/reserves');

/* GET home page. */
router.get('/', auth, async (req, res) => {
  console.log("Trayendo reservas");
  res.json(await controller.getReserves());
});



module.exports = router;