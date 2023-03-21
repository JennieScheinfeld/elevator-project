import styled from "styled-components"

export const Grid = styled.div`
  // margin: 10px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  padding: 10px;
  align-self: flex-end;
`

export const GridItem = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgb(237 237 237);;
    width: 80px;
    height: 38px;
    padding: 10px;
    font-size: 30px;
    text-align: center;
`