# Money Chart

![Example](./example.png)

## Goal

Depending on your budget for the month and your daily expenses, the project will display your daily budget for the rest of the month.

## Usage

Clone the repository. Inside `data.js` update the `expenses` array with your information:

* The chart title for a given month via `chartTitle`
* The chart id in the DOM via `element`
* The number of days in the month via `dayInMonth`
* Your budget for this month via `budget`
* All your expenses by day for the given month via the array `expenses`

For each month you need to define inside the `expenses` property the following information

* The day in the format `YYYY-MM-DD`
* How much you spent that day