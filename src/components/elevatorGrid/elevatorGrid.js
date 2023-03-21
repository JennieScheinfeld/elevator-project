import * as Styled from './style'
import Elevator from '../elevator/elevator';

export const ElevatorGrid =({elevatorNum= 5, levelsNum= 10 }) => {
  let gridIds = Array.from({ length: elevatorNum*levelsNum }, (_, index) => elevatorNum*levelsNum -index - 1);  
  return (
        <Styled.Grid>
                 {gridIds.map((itemId)=> {
                  const showElevator = itemId < elevatorNum
                return ( 
                  <Styled.GridItem key={itemId}>
                      { showElevator ? <Elevator key={itemId} id={itemId} startingLevel={0}/> : <div style={{ padding: "20px"}}/>}
                  </Styled.GridItem>
              )
            })}
        </Styled.Grid>

      );
    };
