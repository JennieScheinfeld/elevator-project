import * as Styled from "./style"

const mapOfSuffix = {
    1: "st",
    2: "nd",
    3: "rd"
}

export const LevelsContainer = ({ numOfFloors = 10}) => {
    let arrayOfIds = Array.from({ length: numOfFloors }, (_, index) => index);
    return <Styled.Container>
    {arrayOfIds.map(itemId => {
        const str = itemId === 0 ? "Ground Floor" : (itemId <= 3 ?  itemId + mapOfSuffix[itemId] : itemId + "th")
        return <Styled.StyledLevel id={itemId} key={itemId}>{str}</Styled.StyledLevel>
        })}
    </Styled.Container>
}