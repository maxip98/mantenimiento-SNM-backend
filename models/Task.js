// Define el esquema de la base de datos para las tareas, 
// incluyendo campos como local, pedido, descripción, prioridad, fecha de carga, estado de completado, pedido por y tipo de mantenimiento.

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  local: { type: String, required: true },
  pedido: { type: String, required: true },
  descripcion: { type: String, required: true },
  prioridad: { type: String, required: true },
  fechaCarga: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  pedidoPor: { type: String, required: true },
  tipoMantenimiento: { type: String, required: true },
  observaciones: { type: String, default: '' } // Nuevo campo
});

module.exports = mongoose.model('Task', taskSchema);