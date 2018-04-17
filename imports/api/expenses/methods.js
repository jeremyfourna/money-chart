// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Expenses } from './expenses.js';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = 'validation-error';
  ddpError.details = error.details;
  return ddpError;
});

const expenseSchema = new SimpleSchema({
  createdAt: Date,
  day: String,
  spent: Number,
  userId: String
}, { check });

Meteor.methods({
  'expenses.insert': expense => {
    expenseSchema.validate(expense);

    return Expenses.insert(expense);
  },
});
