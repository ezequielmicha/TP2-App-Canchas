const express = require('express');
const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const controller = require('../controllers/users');

router.get('/', async (req, res) => {
    console.log("Trayendo usuarios");
    res.json(await controller.getUsers());
});

module.exports = router;
