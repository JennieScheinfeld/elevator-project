import { useEffect, useState } from "react"
import { ElevatorGrid } from "../elevatorGrid/elevatorGrid"
import { useDispatch, connect, useSelector } from 'react-redux';
import {updateLevel, updateOccupied} from '../../app/slices/elevatorChartSlice'
import {STATUSES, updateStatus, updateElevatorId} from '../../app/slices/requestsSlice'
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

        if (levelId !== elevatorChart[elevatorId]?.level) {
            dispatch(updateLevel({ level:levelId, elevatorId}))
            dispatch(updateStatus({ buttonId: levelId, status: STATUSES.Waiting }))
            dispatch(updateElevatorId({ buttonId: levelId, elevatorId}))
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
        <LevelsContainer numOfFloors={numOfFloors}/>
        <ElevatorGrid numOfElevators={numOfElevators} numOfFloors={numOfFloors} />
        <ButtonContainer numOfButtons={numOfFloors} handleClick={handleClick} />
    </Container>
}

export default connect()(ElevatorSystemBase)