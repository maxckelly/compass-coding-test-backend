const { Text, Integer } = require('@keystonejs/fields');

module.exports = {
  fields: {
    text: {
      type: Text,
      required: true
    },

    order: {
      type: Integer
    }
  }
};
