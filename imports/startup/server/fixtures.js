// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {
  and,
  assoc,
  equals,
  map
} from 'ramda';
import { Expenses } from '../../api/expenses/expenses.js';

Meteor.startup(() => {
  // if the Expenses collection is empty
  if (and(
      equals(Expenses.find().count(), 0),
      equals(Meteor.users.find().count(), 0)
    )) {
    const newUserId = Accounts.createUser({
      email: 'jeremyfourna@gmail.com',
      password: '1234567890'
    });
    const expenses = [
      { day: '2018-03-01', createdAt: new Date(), spent: 132.54 },
      { day: '2018-03-02', createdAt: new Date(), spent: 129.6 },
      { day: '2018-03-03', createdAt: new Date(), spent: 40 },
      { day: '2018-03-04', createdAt: new Date(), spent: 116.58 },
      { day: '2018-03-05', createdAt: new Date(), spent: 115.52 },
      { day: '2018-03-06', createdAt: new Date(), spent: 360.7 },
      { day: '2018-03-07', createdAt: new Date(), spent: 5.6 },
      { day: '2018-03-08', createdAt: new Date(), spent: 0 },
      { day: '2018-03-09', createdAt: new Date(), spent: 55.6 },
      { day: '2018-03-10', createdAt: new Date(), spent: 250.7 },
      { day: '2018-03-11', createdAt: new Date(), spent: 34.25 },
      { day: '2018-03-12', createdAt: new Date(), spent: 40 },
      { day: '2018-03-13', createdAt: new Date(), spent: 73.21 },
      { day: '2018-03-14', createdAt: new Date(), spent: 39 },
      { day: '2018-03-15', createdAt: new Date(), spent: 0 },
      { day: '2018-03-16', createdAt: new Date(), spent: 7.5 },
      { day: '2018-03-17', createdAt: new Date(), spent: 157.7 },
      { day: '2018-03-18', createdAt: new Date(), spent: 52.6 },
      { day: '2018-03-19', createdAt: new Date(), spent: 77.12 },
      { day: '2018-03-20', createdAt: new Date(), spent: 187.9 },
      { day: '2018-03-21', createdAt: new Date(), spent: 100 },
      { day: '2018-03-22', createdAt: new Date(), spent: 15 },
      { day: '2018-03-23', createdAt: new Date(), spent: 92 },
      { day: '2018-03-24', createdAt: new Date(), spent: 10.82 },
      { day: '2018-03-25', createdAt: new Date(), spent: 60 },
      { day: '2018-03-26', createdAt: new Date(), spent: 76.47 },
      { day: '2018-03-27', createdAt: new Date(), spent: 39.15 },
      { day: '2018-03-28', createdAt: new Date(), spent: 0 },
      { day: '2018-03-29', createdAt: new Date(), spent: 152.03 },
      { day: '2018-03-30', createdAt: new Date(), spent: 25.96 },
      { day: '2018-03-31', createdAt: new Date(), spent: 53.9 },
      { day: '2018-04-01', createdAt: new Date(), spent: 95.99 },
      { day: '2018-04-02', createdAt: new Date(), spent: 0.82 },
      { day: '2018-04-03', createdAt: new Date(), spent: 0 },
      { day: '2018-04-04', createdAt: new Date(), spent: 54.34 },
      { day: '2018-04-05', createdAt: new Date(), spent: 81.72 },
      { day: '2018-04-06', createdAt: new Date(), spent: 107.5 },
      { day: '2018-04-07', createdAt: new Date(), spent: 0 },
      { day: '2018-04-08', createdAt: new Date(), spent: 293.1 },
      { day: '2018-04-09', createdAt: new Date(), spent: 0 },
      { day: '2018-04-10', createdAt: new Date(), spent: 9 },
      { day: '2018-04-11', createdAt: new Date(), spent: 0 },
      { day: '2018-04-12', createdAt: new Date(), spent: 17.93 },
      { day: '2018-04-13', createdAt: new Date(), spent: 19.90 },
      { day: '2018-04-14', createdAt: new Date(), spent: 79.9 },
      { day: '2018-04-15', createdAt: new Date(), spent: 9 }
    ];

    return map(cur => {
      const expenseForUser = assoc('userId', newUserId, cur);
      return Meteor.call('expenses.insert', expenseForUser, error => {
        if (error) {
          console.log(error.message, expenseForUser);
        }
      });
    }, expenses)
  }
});
