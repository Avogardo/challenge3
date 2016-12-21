import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Sheet = new Mongo.Collection('sheet');

if (Meteor.isServer) {
  Meteor.publish('sheet', function sheetPublication() {
        return Sheet.find({
    });
  });
}

Meteor.methods({
  'sheet.insert'(text) {
    check(text, String);

    Sheet.insert({
      text
    });
  },

  'sheet.remove'() {
    Sheet.remove({});
  },

    'sheet.update'(sheetId, newtext) {
    check(sheetId, String);
    check(newtext, String);

    Sheet.update(sheetId, { $set: { text: newtext } });
  }
});