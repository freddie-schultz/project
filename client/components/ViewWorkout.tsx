import { Link, useParams } from 'react-router-dom'
import { useWorkoutData } from '../apis/api'
import ViewWorkoutList from './ViewWorkoutList'
import { useState } from 'react'
import ActiveWorkout from './ActiveWorkout'
import { Button, Heading, HStack, Text } from '@chakra-ui/react'

export default function ViewWorkout() {
  const { id } = useParams()
  const { data: workout, isPending, error } = useWorkoutData(Number(id))
  const [workoutActive, setWorkoutActive] = useState(false)

  if (isPending) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!workout) {
    return <p>No data</p>
  }

  const toggleWorkoutActive = () => {
    setWorkoutActive(!workoutActive)
  }

  return (
    <>
      <HStack marginBottom="2vw">
        <Link to="/workouts">
          <Text fontSize="1.5vw">⬅️ Back</Text>
        </Link>
        <Button marginRight="auto" marginLeft="30vw" onClick={toggleWorkoutActive}>{`${
          workoutActive ? 'Stop' : 'Start'
        } working out!`}</Button>
      </HStack>
      <Heading m="2vw">{workout.name}</Heading>

      {workoutActive ? <ActiveWorkout {...workout} /> : <ViewWorkoutList {...workout} />}
    </>
  )
}
