const { render } = require('express/lib/response');
const clientsModel = require('../Models/clientsModel');
const { all } = require('../routes');

const clientsController = {
    
    createClient: (req, res) => {
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
            res.render('../views/clientsList', { allClients: allClients })
        } catch (error) {
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
    },

    createClientRequest: async (req, res) => {
        try {
            let newClientInfo = req.body;
            await clientsModel.addNewRow(newClientInfo);
            res.redirect('/clients')
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }        
    },
    
    deleteClientRequest: async (req, res) => {
        try {
            let clientID = req.params.id;
            await clientsModel.deleteRowById(clientID);
            res.redirect('/clients')
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }        
    },

    editClientRequest: async (req, res) => {
        try {
            let clientID = req.params.id;
            let clientInfoUpdated = req.body;
            await clientsModel.editRowById(clientID, clientInfoUpdated);
            res.redirect('/clients')
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }        
    }
}

clientsController.showClients()

module.exports = clientsController;