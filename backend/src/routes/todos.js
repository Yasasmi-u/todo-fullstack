const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({ success: true, data: todos });
  } catch (err) {
    next(err);
  }
});

// CREATE todo
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const todo = await Todo.create({
      title: String(title).trim(),
      description: description ? String(description).trim() : ''
    });

    res.status(201).json({
      success: true,
      data: todo
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(err.errors)
          .map(e => e.message)
          .join(', ')
      });
    }

    next(err);
  }
});

// UPDATE todo
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const updates = {};

    if (title !== undefined) {
      if (!String(title).trim()) {
        return res.status(400).json({
          success: false,
          message: 'Title must not be empty'
        });
      }

      updates.title = String(title).trim();
    }

    if (description !== undefined) {
      updates.description = String(description).trim();
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'TODO not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid TODO ID'
      });
    }

    next(err);
  }
});

// TOGGLE done
router.patch('/:id/done', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'TODO not found'
      });
    }

    todo.done = !todo.done;
    await todo.save();

    res.json({
      success: true,
      data: todo
    });

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid TODO ID'
      });
    }

    next(err);
  }
});

// DELETE todo
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'TODO not found'
      });
    }

    res.json({
      success: true,
      message: 'TODO deleted successfully'
    });

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid TODO ID'
      });
    }

    next(err);
  }
});

module.exports = router;