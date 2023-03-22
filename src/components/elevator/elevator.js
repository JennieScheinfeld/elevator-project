import { ElevatorSVG } from '../elevatorSVG'
import {  useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDispatch, connect, useSelector } from 'react-redux';
import {updateOccupied} from '../../app/slices/elevatorChartSlice'
import {STATUSES, updateStatus} from '../../app/slices/requestsSlice'
import {playBellSound} from '../../utils'


const elementSize = 60
const numOfSeconds = 2

const colorByStatus = {
  Call: "black",
  Waiting: "#e53a3a",
  Arrived: "#0bda92"
}
const Elevator = ({ id, startingLevel= 0 }) => {

    const dispatch = useDispatch()

    const currentPosition = useRef(startingLevel *elementSize)
    const elevatorChart = useSelector(state => state.elevatorChart)
    const requests = useSelector(state => state.requests)
    const level = elevatorChart.elevatorChart[id].level

    const status = requests[(elevatorChart.elevatorChart[id].level)].status

    const diff = currentPosition.current - parseInt(level*elementSize)
    const direction = diff < 0 ? -1 : 1

    const setTimeoutFunc = () => {
      return setTimeout(()=> {
        dispatch(updateStatus({ buttonId: elevatorChart.elevatorChart[id].level, status: STATUSES.Call }))
        dispatch(updateOccupied({elevatorId: id, occupied: false }))
      }, numOfSeconds * 1000)
    }

    const AnimatedElevator = animated(ElevatorSVG)
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

      return <AnimatedElevator style={{ marginTop: "10px", fill:colorByStatus[status], stroke:colorByStatus[status], height: "30px", width: "25px", ...springs}}/>
}

export default connect()(Elevator)