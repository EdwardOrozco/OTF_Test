var express = require('express');
var router = express.Router();
const clientsController = require('../Controllers/clientsController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/clients', clientsController.showClients);
router.get('/clients/edit/:id', clientsController.showClientByRowId);
router.get('/clients/delete/:id', clientsController.deleteClient);
router.get('/clients/create', clientsController.addClient);

module.exports = router;
