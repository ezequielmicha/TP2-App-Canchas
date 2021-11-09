const express = require('express');
const router = express.Router();
const data = require("../data/users");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const controller = require('../controllers/users');

router.get('/', async (req, res) => {
    console.log("Trayendo usuarios");
    res.json(await controller.getUsers());
});

router.post('/', async (req, res)=>{
    console.log("Creando un usuario");
    res.send(await data.addUser(req.body));
});

module.exports = router;
