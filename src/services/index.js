const GetWonDealsService = require('./pipedrive/GetWonDealsService');

async function main() {
  const getWonDeals = new GetWonDealsService();
  await getWonDeals.execute();
}

main();
