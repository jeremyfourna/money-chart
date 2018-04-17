// Tests for the expenses publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'chai';
import { Expenses } from '../expenses.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import './publications.js';

describe('expenses publications', function() {
  beforeEach(function() {
    Expenses.remove({});
    Expenses.insert({
      title: 'meteor homepage',
      url: 'https://www.meteor.com',
    });
  });

  describe('expenses.all', function() {
    it('sends all expenses', function(done) {
      const collector = new PublicationCollector();
      collector.collect('expenses.all', (collections) => {
        assert.equal(collections.expenses.length, 1);
        done();
      });
    });
  });
});
