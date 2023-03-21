import { ElevatorSVG } from '../elevatorSVG'
import { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDispatch, connect, useSelector } from 'react-redux';
import {updateOccupied} from '../../app/slices/elevatorChartSlice'
import {STATUSES, updateStatus} from '../../app/slices/requestsSlice'
import {playBellSound} from '../../utils'

const elementSize = 60
const seconds = 2

const colorByStatus = {
  Call: "black",
  Waiting: "#e53a3a",
  Arrived: "#0bda92"
}
const Elevator = ({ id, startingLevel= 0 }) => {

    const dispatch = useDispatch()
    const currentPosition = useRef(startingLevel *elementSize)
    const { elevatorChart, requests: levelRequests } = useSelector(state => state)
    const level = elevatorChart.elevatorChart[id].level
    const sameLevel = level === Math.abs(currentPosition.current/elementSize)
    const status = levelRequests[(elevatorChart.elevatorChart[id].level)].status




    // console.log("sameLevel:", sameLevel, " level:", level, " currentPosition.current/elementSize:",  currentPosition.current/elementSize)

    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const diff = currentPosition.current - parseInt(level*elementSize)
    const setTimeoutFunc = () => {
      return setTimeout(()=> {
        dispatch(updateStatus({ buttonId: elevatorChart.elevatorChart[id].level, status: STATUSES.Call }))
        dispatch(updateOccupied({elevatorId: id, occupied: false }))
      }, seconds * 1000)
    }
    const direction = diff < 0 ? -1 : 1
    const springs = useSpring({
        from: {y: currentPosition.current  },
        to: { y:  level *elementSize * direction },
        onRest: async () => {
          currentPosition.current =  level *elementSize * direction
          dispatch(updateStatus({ buttonId: elevatorChart.elevatorChart[id].level, status: STATUSES.Arrived}))
          playBellSound()
          setTimeoutFunc()
 
        }
      })
      const AnimatedElevator = animated(ElevatorSVG)


      return <AnimatedElevator style={{ border: "1px", fill:colorByStatus[status], stroke:colorByStatus[status], height: "30px", width: "25px", ...springs}} />
}

export default connect()(Elevator)