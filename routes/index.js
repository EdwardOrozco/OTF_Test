var express = require('express');
var router = express.Router();
const clientsController = require('../Controllers/clientsController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/clients', clientsController.showClients);

module.exports = router;
