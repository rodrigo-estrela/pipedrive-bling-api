const mongoose = require('mongoose');

const Sales = mongoose.model('sales');

class AddSalesService {
  async execute(deals) {
    const totalSales = {};

    deals.forEach(deal => {
      totalSales[deal.won_time] =
        totalSales[deal.won_time] + deal.value || deal.value;
    });

    console.log(totalSales);
    Object.keys(totalSales).forEach(async day => {
      const sales = await Sales.findOne({ date: day });

      if (!sales) {
        await (
          await Sales.create({ date: day, value: totalSales[day] })
        ).save();
      } else {
        sales.value += totalSales[day];

        await Sales.findOneAndUpdate({ date: day }, { value: sales.value });
      }
    });
  }
}

module.exports = AddSalesService;
