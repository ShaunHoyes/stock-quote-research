const
  clc = require('cli-color'),
  googleStocks = require('google-stocks'),
  Table = require('cli-table2'),
  ticker =  process.argv[2];

/*
googleStocks(['GS'], function(error, data) {
  console.log(Object.keys(data[0].keyratios[0])[0]); // "title"
  console.log(data[0].keyratios[0][Object.keys(data[0].keyratios[0])[0]]); // 'Net Profit Margin'
  console.log(data[0].keyratios.length);
})
*/






googleStocks([ticker], function(error, data) {
  let table = new Table({
    colWidths: [15, 12]
  });
  let ratioTable = new Table({
    head: ['Key Ratio', 'Recent Qtr', 'Annual', 'TTM'],
    colWidths: [28, 12, 10, 10]
  })

  function colorizePercent(dataPoint) {
    if (dataPoint < 0) {
      return clc.red("(" + dataPoint + "%" + ")")
    } else {
      return clc.green("(" + dataPoint + "%" + ")")
    }
  };

  function colorize(price) {
    if (data[0].cp < 0) {
      return clc.red("$" + price)
    } else {
      return clc.green("$" + price)
    }
  };


  console.log('\nCompany:', clc.bold(data[0].name, "(" + ticker.toUpperCase() + ")"));
  // console.log(data[0].l, colorizedPercent(data[0].cp));
  console.log(clc.bold(`$` + data[0].l, colorizePercent(data[0].cp)));


  table.push(
    // ['Price', "$" + data[0].l],
    // ['Change', data[0].cp],
    ['Dividend', data[0].dy + "%"],
    ['Market Cap', data[0].mc],
    ['Volume', data[0].vo],
    ['PE ratio', data[0].pe],
    ['EPS', data[0].eps],
    ['Beta', data[0].beta],
    ['Exchange', data[0].exchange]
  )

  for (let i = 0; i < data[0].keyratios.length; i++) {
    ratioTable.push(
      [data[0].keyratios[i].title, data[0].keyratios[i].recent_quarter, data[0].keyratios[i].annual, data[0].keyratios[i].ttm]
    )
  }
  // console.log(data);
  console.log(table.toString());
  console.log(ratioTable.toString());
  console.log(clc.bold('Sector:'), data[0].sname);
  console.log(clc.bold('Industry:'), data[0].iname);
  console.log(clc.bold("Institutional Ownership:"), data[0].instown);
  // for (let i = 0; i < data[0].related[0].length; i++) {
  //   console.log(data[0].related[0][i].name);
  // }
  console.log(clc.bold("Summary:"), data[0].summary[0].overview);
});
