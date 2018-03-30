/* jshint esversion:6 */

// moneyChart :: (string, string, array) -> chart
function moneyChart(element, period, data) {
  const context = document.getElementById(element).getContext('2d');

  return new Chart(context, {
    data,
    type: 'bar',
    options: {
      title: {
        display: true,
        text: period
      },
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 10
          },
          stacked: true
        }],
        xAxis: [{
          stacked: true
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    }
  });
}

// cleanDataSet :: (string, string, array) -> array
function cleanDataSet(xProp, yProp, listOfData) {
  return R.map(cur => {
    return {
      x: R.prop(xProp, cur),
      y: R.prop(yProp, cur)
    };
  }, listOfData);
}

// cleanNumber :: (number, number) -> number
function cleanNumber(nbDecimals, number) {
  const tenPowerDecimals = R.multiply(10, nbDecimals);

  return R.compose(
    R.divide(R.__, tenPowerDecimals),
    Math.trunc,
    R.multiply(tenPowerDecimals)
  )(number);
}

// savedMoney :: (number, object) -> number
function savedMoney(dailyBudget, expenseForTheDay) {
  const expenses = R.prop('spent', expenseForTheDay);

  return R.ifElse(
    () => R.gte(expenses, dailyBudget),
    R.always(0),
    () => cleanNumber(2, R.subtract(dailyBudget, expenses))
  )(expenseForTheDay);
}

// buildDataSets :: (number, number, array) -> object
function buildDataSets(nbDaysInTheMonth, monthlyBudget, monthlyExpenses) {
  // remainingBudget :: array -> array
  function remainingBudget(monthlyExpenses) {
    // remainingBudgetForEachDay :: (number, number, array, array) -> array
    function remainingBudgetForEachDay(remainingDaysInTheMonth, remainingBudget, monthlyExpenses, result = []) {
      return R.ifElse(
        R.isEmpty,
        R.always(result),
        (list) => {
          const currentDay = R.head(list);
          const dailyBudget = cleanNumber(2, R.divide(remainingBudget, remainingDaysInTheMonth));

          const resultForTheDay = {
            dailyBudget: R.ifElse(R.gt(0), R.always(0), R.always(dailyBudget))(dailyBudget),
            day: R.prop('day', currentDay),
            spent: R.prop('spent', currentDay),
            saved: savedMoney(dailyBudget, currentDay),
          };

          return remainingBudgetForEachDay(
            R.dec(remainingDaysInTheMonth),
            R.subtract(remainingBudget, R.prop('spent', currentDay)),
            R.tail(monthlyExpenses),
            R.append(resultForTheDay, result)
          );
        }
      )(monthlyExpenses);
    }

    return remainingBudgetForEachDay(nbDaysInTheMonth, monthlyBudget, monthlyExpenses);
  }

  const dataSetForChart = remainingBudget(monthlyExpenses);

  return {
    labels: R.map(cur => R.prop('day', cur), dataSetForChart),
    datasets: [{
      type: 'line',
      label: 'Daily budget',
      data: cleanDataSet('day', 'dailyBudget', dataSetForChart),
      backgroundColor: '#0C090A',
      borderColor: '#0C090A',
      borderWidth: 1,
      fill: false,
      stack: 'Stack 1'
    }, {
      type: 'bar',
      label: 'Expenses',
      data: cleanDataSet('day', 'spent', dataSetForChart),
      backgroundColor: '#565051',
      borderColor: '#565051',
      borderWidth: 1,
      stack: 'Stack 0'
    }, {
      type: 'bar',
      label: 'Saved',
      data: cleanDataSet('day', 'saved', dataSetForChart),
      backgroundColor: '#E5E4E2',
      borderColor: '#E5E4E2',
      borderWidth: 1,
      stack: 'Stack 0'
    }]
  };
}
