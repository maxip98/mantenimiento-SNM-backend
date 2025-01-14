// Gestiona las tareas, incluyendo la obtención, creación, actualización, eliminación y marcación de tareas como completadas.

const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Error al obtener tareas');
  }
};

exports.createTask = async (req, res) => {
  try {
    const { local, pedido, descripcion, prioridad, tipoMantenimiento } = req.body;
    console.log('Usuario que crea la tarea:', req.user.username); // Mensaje de depuración
    const newTask = new Task({
      local,
      pedido,
      descripcion,
      prioridad,
      tipoMantenimiento,
      pedidoPor: req.user.username // Asignar el nombre de usuario del creador
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).send('Error al crear tarea');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).send('Error al actualizar tarea');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send('Tarea eliminada');
  } catch (error) {
    res.status(500).send('Error al eliminar tarea');
  }
};

exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).send('Error al completar tarea');
  }
};