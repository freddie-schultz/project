import express from 'express'

import * as db from '../db/functions/workouts.ts'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const workouts = await db.getAllWorkouts()
    res.json(workouts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const workout = await db.getWorkoutWithExercises(id)
    res.json(workout)
  } catch (error) {
    next(error)
  }
})

router.post('/add-exercise', async (req, res, next) => {
  try {
    const newExercise = req.body
    const response = await db.addExerciseToWorkout(newExercise)
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newWorkout = req.body
    const response = await db.addWorkout(newWorkout)
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
})

router.patch('/edit-exercise', async (req, res, next) => {
  try {
    // const workoutId = Number(req.params.workoutId)
    // const exerciseId = Number(req.params.exerciseId)

    // const newExercise = { ...req.body, workoutId, exerciseId }

    const response = await db.updateExerciseInWorkout(req.body)
    res.status(204).json(response)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const updatedWorkout = req.body
    const response = await db.updateWorkout(id, updatedWorkout)
    res.status(204).json(response)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const response = await db.deleteWorkout(id)
    res.status(204).json(response)
  } catch (error) {
    next(error)
  }
})

router.delete('/:workoutId/exercises/:exerciseId', async (req, res, next) => {
  try {
    const workoutId = Number(req.params.workoutId)
    const exerciseId = Number(req.params.exerciseId)
    const response = await db.deleteExerciseInWorkout(workoutId, exerciseId)
    res.status(204).json(response)
  } catch (error) {
    next(error)
  }
})

export default router
