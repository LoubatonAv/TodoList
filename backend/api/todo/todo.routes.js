const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const express = require('express');
const { log } = require('../../middlewares/logger.middleware');
const { getTodos, getTodoById, addTodo, updateTodo, removeTodo } = require('./todo.controller');
const router = express.Router();

router.get('/', log, getTodos);
router.get('/:id', getTodoById);
router.post('/', addTodo);
router.put('/', updateTodo);
// router.delete('/:id', requireAuth, requireAdmin, removeTodo);
router.delete('/:id', removeTodo);

module.exports = router;
