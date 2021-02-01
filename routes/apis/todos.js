var express = require('express')
var router = express.Router()

// Load machine controller
var todos_controller = require('../../controllers/todosController')

/* GET test route. */
// router.get('/test', todos_controller.test)
router.get('/', todos_controller.listTodo)
router.post('/', todos_controller.createTodo)
router.put('/:id', todos_controller.updateTodo)
router.delete('/:id', todos_controller.deleteTodo)

module.exports = router
