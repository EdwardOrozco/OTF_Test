const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({"apiKey":"99011b81-c161-4ebd-b7f9-52f222ecea04"});

const tableIdOrName = "developer_test_4";
const sort = undefined;
const after = undefined;
const limit = undefined;
const properties = undefined;

async function dbRequest (){

try {
  const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRows(tableIdOrName, sort, after, limit, properties);
  console.log(JSON.stringify(apiResponse.results, null, 2));
} catch (e) {
  e.message === 'HTTP request failed'
    ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e)
}

}

dbRequest();