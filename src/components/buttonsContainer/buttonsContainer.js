import * as Styled from "./style"
import { Button } from "../button/button";

export const ButtonContainer = ({numOfButtons= 10, handleClick}) => {
    let arrayOfIds = Array.from({ length: numOfButtons }, (_, index) => index);

    return <Styled.container>
            {arrayOfIds.map(itemId => {
                const isBottom = itemId === 0
        return <Button id={itemId} key={itemId}  isBottom={isBottom} onClick={() => handleClick(itemId)}/>
    })}
    </Styled.container>
}