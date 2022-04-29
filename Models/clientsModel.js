const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ "apiKey": "99011b81-c161-4ebd-b7f9-52f222ecea04" });
const tableIdOrName = "developer_test_4";

const clientsModel = {

  publishDraftTable: async function () {

    let includeForeignIds = undefined;

    try {
      const apiResponse = await hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableIdOrName, includeForeignIds);
      console.log(JSON.stringify(apiResponse.body, null, 2));
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
  },

  getAllRows: async function () {

    const sort = undefined;
    const after = undefined;
    const limit = undefined;
    const properties = undefined;

    try {
      const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRows(tableIdOrName, sort, after, limit, properties);
      return apiResponse;
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }

  },

  getRowById: async function (clientID) {

    let rowId = clientID;

    try {
      const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRow(tableIdOrName, rowId);
      return apiResponse;
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }

  },

  addNewRow: async function (newClientInfo) {

    let values = {
      "name": newClientInfo.name,
      "last_name": newClientInfo.last_name,
      "document_id": newClientInfo.document_id
    };

    let HubDbTableRowV3Request = { path: null, name: "test_title", childTableId: "0", values };

    try {
      const apiResponse = await hubspotClient.cms.hubdb.rowsApi.createTableRow(tableIdOrName, HubDbTableRowV3Request);
      await this.publishDraftTable();
      console.log(JSON.stringify(apiResponse.body, null, 2));
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }

  },

  deleteRowById: async function (clientID) {
    const BatchInputString = { inputs: [clientID] };

    try {
      const apiResponse = await hubspotClient.cms.hubdb.rowsBatchApi.batchPurgeDraftTableRows(tableIdOrName, BatchInputString);
      await this.publishDraftTable();
      console.log(JSON.stringify(apiResponse.body, null, 2));
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
  },

  editRowById: async function (clientID, clientInfoUpdated) {

    let rowId = clientID;

    let values = {
      "name": clientInfoUpdated.name,
      "last_name": clientInfoUpdated.last_name,
      "document_id": clientInfoUpdated.document_id
    };

    console.log(clientInfoUpdated);

    const HubDbTableRowV3Request = { path: null, name: "test_title", childTableId: "0", values };

    try {
      const apiResponse = await hubspotClient.cms.hubdb.rowsApi.updateDraftTableRow(tableIdOrName, rowId, HubDbTableRowV3Request);
      await this.publishDraftTable();
      console.log(JSON.stringify(apiResponse.body, null, 2));
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
  }

}

module.exports = clientsModel;