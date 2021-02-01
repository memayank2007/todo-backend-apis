const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Load Validation
const validateTodoInput = require('../validation/todo')

// Load Todo Model
const Todo = require('../models/Todo')

// @route   GET api/todos/test
// @desc    Tests todo route
// @access  Public
exports.test = function (req, res) {
  res.json({
    msg: 'todos Works'
  })
}

exports.listTodo = function (req, res, next) {
  Todo.find({}, function (err, todos) {
    if (err) {
      res.status(400).json({
        error: err
      })
    }
    res.json({
      todos: todos
    })
  })
}

// @route   Post api/todos
// @desc    Create todo route
// @access  Public
exports.createTodo = function (req, res) {

  const {
    errors,
    isValid
  } = validateTodoInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  var todo = {
    title: req.body.title
  }

  Todo.create(todo, function (err, todo) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: 'todo created successfully',
      data: todo
    })
  })
}

// @route   Patch api/todos/:id
// @desc    Update todo route
// @access  Public
exports.updateTodo = function (req, res, next) {
  var todo = {
    title: req.body.title
  }
  Todo.update({
    _id: req.params.id
  }, todo, function (err, todo) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: 'Todo updated successfully'
    })
  })
}

// @route   Delete api/todos/:id
// @desc    Delete todo route
// @access  Public
exports.deleteTodo = function (req, res, next) {
  Todo.deleteOne({
    _id: req.params.id
  }, function (err, todo) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: 'Todo deleted successfully'
    })
  })
}