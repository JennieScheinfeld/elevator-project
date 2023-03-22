import * as Styled from './style'
import Elevator from '../elevator/elevator';
import Timer from '../timer/timer'
import { useSelector } from 'react-redux';
import { STATUSES } from '../../app/slices/requestsSlice';


export const ElevatorGrid =({numOfElevators, numOfFloors }) => {
  let gridIds = Array.from({ length: numOfElevators*numOfFloors }, (_, index) => numOfElevators*numOfFloors -index - 1);
  const requests = useSelector(state => state.requests)
  const levelIdsWaiting = Object.keys(requests).filter(requestsId => {
    return requests[requestsId].status === STATUSES.Waiting || requests[requestsId].status === STATUSES.Arrived 
  })

  const itemsToShowTimer = levelIdsWaiting.map(levelId => {
    const result = (numOfElevators * (parseInt(levelId) + 1)) - (numOfElevators - requests[levelId].elevatorId)
    return result
  })

  return (
        <Styled.Grid colmunsNum={numOfElevators}>
                 {gridIds.map((itemId)=> {
                  const showElevator = itemId < numOfElevators
                  const showTimer = itemsToShowTimer.includes(itemId)
                return ( 
                  <Styled.GridItem key={itemId}>
                    <div>
                      {showTimer ? <Timer shouldStart={true}/> : null}
                      { showElevator ? <Elevator key={itemId} id={itemId} startingLevel={0}/> : <div style={{ padding: "20px"}}/>}
                    </div>

                  </Styled.GridItem>
              )
            })}
        </Styled.Grid>

      );
    };
