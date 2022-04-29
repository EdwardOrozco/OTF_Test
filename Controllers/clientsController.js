const { render } = require('express/lib/response');
const clientsModel = require('../Models/clientsModel');
const { all } = require('../routes');

const clientsController = {

    
    addClient: (req, res) => {
        res.render("../views/addClient.ejs")
    },

    deleteClient: async (req, res) => {
        try {
            let clientID = req.params.id;
            let apiResponse = await clientsModel.getRowById(clientID);
            let client = apiResponse;
            res.render('../views/deleteClient.ejs', { client: client })
        } catch (error) {
            res.redirect("/");
        }
    },
    
    showClients: async (req, res) => {
        try {
            let apiResponse = await clientsModel.getAllRows();
            let allClients = apiResponse.results;
            res.render('../views/clients', { allClients: allClients })
        } catch (error) {
            res.redirect("../views/index.ejs");
        }
    },

    showClientByRowId: async (req, res) => {
        try {
            let clientID = req.params.id;
            let apiResponse = await clientsModel.getRowById(clientID);
            let client = apiResponse;
            res.render('../views/editClient.ejs', { client: client })
        } catch (error) {
            res.redirect("/");
        }
    }
}

clientsController.showClients()

module.exports = clientsController;