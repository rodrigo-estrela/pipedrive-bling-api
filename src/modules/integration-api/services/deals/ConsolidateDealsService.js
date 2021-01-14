const mongoose = require('mongoose');

const ConsolidatedDeals = mongoose.model('consolidatedDeals');

class ConsolidateDealsService {
  async execute(deals) {
    const newDealsByDay = {};

    deals.forEach(deal => {
      newDealsByDay[deal.won_time] =
        newDealsByDay[deal.won_time] + deal.value || deal.value;
    });

    Object.keys(newDealsByDay).forEach(async day => {
      const currentDayResult = await ConsolidatedDeals.findOne({ date: day });

      if (!currentDayResult) {
        await (
          await ConsolidatedDeals.create({
            date: day,
            value: newDealsByDay[day],
          })
        ).save();
      } else {
        currentDayResult.value += newDealsByDay[day];

        await ConsolidatedDeals.findOneAndUpdate(
          { date: day },
          { value: currentDayResult.value },
        );
      }
    });
  }
}

module.exports = ConsolidateDealsService;
