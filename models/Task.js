//Task
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  local: String,
  pedido: String,
  descripcion: String,
  prioridad: String,
  fechaCarga: { type: Date, default: Date.now },
  completada: { type: Boolean, default: false },
  fechaFinalizacion: Date
});

module.exports = mongoose.model('Task', taskSchema);