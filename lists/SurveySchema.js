const { Text, Relationship, Integer } = require('@keystonejs/fields');

module.exports = {
  fields: {
    name: {
      type: Text, 
      required: true
    },

    displayOrder: {
      type: Integer
    },

    questions: {
      type: Relationship,
      ref: 'Question.surveys',
      many: true
    }
  }
};