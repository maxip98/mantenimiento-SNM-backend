// Define las rutas para la gestión de tareas, 
// incluyendo la obtención, creación, actualización, eliminación y marcación de tareas como completadas, con verificación de roles.

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyRole } = require('../middleware/authMiddleware');

router.get('/', verifyRole(['admin', 'viewer']), taskController.getTasks);
router.post('/', verifyRole(['admin']), taskController.createTask);
router.put('/:id', verifyRole(['admin']), taskController.updateTask);
router.delete('/:id', verifyRole(['admin']), taskController.deleteTask);
router.put('/:id/complete', verifyRole(['admin']), taskController.completeTask);

module.exports = router;