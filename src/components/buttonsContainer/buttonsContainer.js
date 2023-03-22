import * as Styled from "./style"
import { Button } from "../button/button";

export const ButtonContainer = ({numOfButtons= 10, handleClick}) => {
    let arrayOfIds = Array.from({ length: numOfButtons }, (_, index) => index);

    return <Styled.Container>
            {arrayOfIds.map(itemId => {
                const isBottom = itemId === 0
        return <Styled.ButtonContainer>
            <Button id={itemId} key={itemId}  isBottom={isBottom} onClick={() => handleClick(itemId)}/>
        </Styled.ButtonContainer>
    })}
    </Styled.Container>
}