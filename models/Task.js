const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  local: { type: String, required: true },
  pedido: { type: String, required: true },
  descripcion: { type: String, required: true },
  prioridad: { type: String, required: true },
<<<<<<< HEAD
  fechaCarga: { type: Date, default: Date.now }
=======
  fechaCarga: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false } 
>>>>>>> 6e118b4 (Actualiza la estructura de archivos del proyecto)
});

module.exports = mongoose.model('Task', taskSchema);