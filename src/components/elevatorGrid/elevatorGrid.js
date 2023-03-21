import * as Styled from './style'
import Elevator from '../elevator/elevator';
import { useDispatch, connect, useSelector } from 'react-redux';


export const ElevatorGrid =({numOfElevators, numOfFloors }) => {
  let gridIds = Array.from({ length: numOfElevators*numOfFloors }, (_, index) => numOfElevators*numOfFloors -index - 1);
  const elevatorChart = useSelector(state => state.elevatorChart)

  return (
        <Styled.Grid colmunsNum={numOfElevators}>
                 {gridIds.map((itemId)=> {
                  const showElevator = itemId < numOfElevators
                  const showTime = elevatorChart
                return ( 
                  <Styled.GridItem key={itemId}> 
                  {itemId}
                      { showElevator ? <Elevator key={itemId} id={itemId} startingLevel={0}/> : <div style={{ padding: "20px"}}/>}
                  </Styled.GridItem>
              )
            })}
        </Styled.Grid>

      );
    };
