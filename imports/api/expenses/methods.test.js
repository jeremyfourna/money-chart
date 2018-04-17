// Tests for links methods
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Expenses } from './expenses.js';
import './methods.js';

if (Meteor.isServer) {
  describe('expenses methods', function() {
    beforeEach(function() {
      Expenses.remove({});
    });

    it('can add a new expense', function() {
      const addExpense = Meteor.server.method_handlers['expenses.insert'];

      addExpense.apply({}, ['meteor.com', 'https://www.meteor.com']);

      assert.equal(Expenses.find().count(), 1);
    });
  });
}
