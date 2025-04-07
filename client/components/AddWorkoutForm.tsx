import React, { useState } from 'react'
import { useCreateWorkout } from '../apis/api'
import { WorkoutData } from '../../models/workouts'
import { prependOnceListener } from 'process'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'

interface Props {
  handleAddWorkout: (data: WorkoutData) => void
}

export default function AddWorkoutForm(props: Props) {
  const [name, setName] = useState('')
  const addWorkout = useCreateWorkout()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newWorkout = { name: name }
    props.handleAddWorkout(newWorkout)
  }

  return (
    <>
      <FormControl m="2vw">
        <FormLabel fontSize="2vw">New Workout Name: </FormLabel>
        <Input id="name" type="text" bgColor="white" height="5vw" fontSize="4vw" value={name} onChange={handleChange} />
      </FormControl>
      <Button m="1vw" p="2vw" fontSize="2.5vw" onClick={handleSubmit}>
        Add
      </Button>
      {/* <form name="addWorkout" onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" value={name} onChange={handleChange} />
        &nbsp;<Button onClick={handleSubmit}>Add</Button>
      </form> */}
    </>
  )
}
