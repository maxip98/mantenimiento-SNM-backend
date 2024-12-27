const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ fechaCarga: -1 }); // Ordenar por fecha de carga descendente por defecto
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Error al obtener tareas');
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
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
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error al eliminar tarea');
  }
};

// Nueva función para completar una tarea
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al completar la tarea' });
  }
};