const { Text, Relationship, Integer } = require('@keystonejs/fields');

module.exports = {
  fields: {
    createdBy: {
      type: Text,
      required: true
    },

    title: {
      type: Text,
      required: true
    },

    subTitle: {
      type: Text,
    },

    questionOrder: {
      type: Integer,
      required: true
    },

    surveys: {
      type: Relationship,
      ref: 'Survey.questions',
      many: true
    },

    options: {
      type: Relationship,
      ref: 'Option',
      many: true
    }
  }
};
