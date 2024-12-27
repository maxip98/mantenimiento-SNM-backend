const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  local: { type: String, required: true },
  pedido: { type: String, required: true },
  descripcion: { type: String, required: true },
  prioridad: { type: String, required: true },
  fechaCarga: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false } // Nuevo campo
});

module.exports = mongoose.model('Task', taskSchema);