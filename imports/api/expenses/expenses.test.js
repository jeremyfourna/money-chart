// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Expenses } from './expenses.js';

if (Meteor.isServer) {
  describe('expenses collection', function() {
    it('insert correctly', function() {
      const expenseId = Expenses.insert({
        title: 'meteor homepage',
        url: 'https://www.meteor.com',
      });
      const added = Expenses.find({ _id: expenseId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'expenses');
      assert.equal(count, 1);
    });
  });
}
