const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query
    let filter = {}

    // Filtrar por estado
    if (status === 'completed') {
      filter.completed = true
    }

    if (status === 'pending') {
      filter.completed = false
    }

    // Búsqueda por título
    if (search) {
      filter.title = { $regex: search, $options: 'i' }
    }

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })

    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas' })
  }
})


// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title) {
      return res.status(400).json({ message: 'El título es obligatorio' })
    }

    const newTask = await Task.create({
      title,
      description
    })

    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea' })
  }
})

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea' })
  }
})

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const deletedTask = await Task.findByIdAndDelete(id)

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    res.json({ message: 'Tarea eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea' })
  }
})


module.exports = router
