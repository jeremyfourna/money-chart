// Definition of the expenses collection

import { Mongo } from 'meteor/mongo';

export const Expenses = new Mongo.Collection('expenses');
