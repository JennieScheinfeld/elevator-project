import { useEffect, useState } from "react"
import { ElevatorGrid } from "../elevatorGrid/elevatorGrid"
import { useDispatch, connect, useSelector } from 'react-redux';
import {updateLevel, updateOccupied} from '../../app/slices/elevatorChartSlice'
import {STATUSES, updateStatus} from '../../app/slices/requestsSlice'
import { ButtonContainer } from "../buttonsContainer/buttonsContainer";
import { LevelsContainer} from "../levelsContainer/levelsContainer"
import {Container} from './style'
import {playBellSound} from '../../utils'


const ElevatorSystemBase = ({ numOfElevators = 5, numOfFloors = 10}) => {
    const elevatorIds = Array.from({ length: numOfElevators }, (_, index) => index);

    const dispatch = useDispatch()

    const elevatorChart = useSelector((state) => state.elevatorChart.elevatorChart)
    const numAvailableElevators = useSelector((state) => state.elevatorChart.numAvailableElevators)

    const [elevatorRequests, setElevatorRequests] = useState([])

    useEffect(() => {
        const t = numAvailableElevators > 0 && elevatorRequests.length
        if (numAvailableElevators > 0 && elevatorRequests.length) {
            let counter = numAvailableElevators
            while (counter > 0){
                const levelId = elevatorRequests[0]
                setElevatorRequests(elevatorRequests => elevatorRequests.slice(1, elevatorRequests.length))
                handleElevatorRequest(levelId)
                counter = counter - 1
            }

        }
    }, [numAvailableElevators])

    const handleElevatorRequest = (levelId) => {
        const elevatorId = allocateElevator(levelId)
        if (elevatorId === null) {
            setElevatorRequests(elevatorRequests => ([...elevatorRequests, levelId]))
            return
        }
        if (levelId !== elevatorChart[elevatorId]?.level) {
            dispatch(updateLevel({ level:levelId, elevatorId}))
            dispatch(updateStatus({ buttonId: levelId, status: STATUSES.Waiting }))
        } else {
            dispatch(updateOccupied({elevatorId, occupied: true }))
            dispatch(updateStatus({ buttonId: levelId, status: STATUSES.Arrived }))
            playBellSound()
            setTimeout(() => {
                dispatch(updateOccupied({elevatorId, occupied: false }))
                dispatch(updateStatus({ buttonId: levelId, status: STATUSES.Call }))
            }, 1000 * 2)
        }

    }

    const handleClick = (levelId) => { 
        if (numAvailableElevators === 0) {
            console.log("elevatorRequests:", elevatorRequests)
            setElevatorRequests(elevatorRequests => ([...elevatorRequests, levelId]))
            dispatch(updateStatus({ buttonId: levelId, status: STATUSES.Waiting }))
        } else {
            handleElevatorRequest(levelId)
        }
    }

    const allocateElevator = (levelId) => {
        let minDiff = Number.MAX_SAFE_INTEGER
        let selectedElevator = null
        for (let id of elevatorIds) {
            const elevator = elevatorChart[id]
            const difference = Math.abs(levelId - elevator.level)
            if ((difference < minDiff) && !elevator.occupied){
                minDiff = difference
                selectedElevator = id
            }
        }
        return selectedElevator
    }
    return <Container >
        <LevelsContainer />
        <ElevatorGrid/>
        <ButtonContainer handleClick={handleClick} />
    </Container>
}

export default connect()(ElevatorSystemBase)