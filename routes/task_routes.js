const express = require('express');
const router = express.Router();
const { Task } = require('../models');
const auth = require('../auth_middleware');

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.findAll({ 
      where: { uid: req.user.id } 
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const task = await Task.create({
      title,
      content,
      uid: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const task = await Task.findOne({
      where: { id: req.params.id, uid: req.user.id }
    });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      task.title = title;
      task.content = content;
      await task.save();
      res.status(201).json(task);
    } catch (error) { 
      res.status(400).json({ message: error.message });
    }
  });

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, uid: req.user.id }
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;