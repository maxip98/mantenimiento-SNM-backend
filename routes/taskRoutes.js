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