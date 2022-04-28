const { render } = require('express/lib/response');
const clientsModel = require('../Models/clientsModel');
const { all } = require('../routes');

const clientsController = {

    showClients: async (req, res) => {
        try {
            let apiResponse = await clientsModel.getAllRows();
            let allClients = apiResponse.results;
            console.log(allClients);
            res.render('../views/clients', {allClients: allClients[0].values})
        } catch (error) {
            res.redirect("../views/index.ejs");
        }
    }
}

clientsController.showClients()

module.exports = clientsController;