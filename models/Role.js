const { Schema, model } = require('mongoose');

const rolSchema = Schema({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio.'],
    unique: true,
  },
});

module.exports = model('Role', rolSchema);
