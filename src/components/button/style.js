import styled from "styled-components"

export const StyledButton = styled.button`
    color: ${(props) => props.params.color};
    background-color:  ${(props) => props.params.backgroundColor};
    border:  ${(props) => props.params.border};
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 17.5px;
    margin-bottom: ${(props) => props.isBottom ? "30px" : "17.5px"};       
    width: 80px;
    font-family: 'Josefin Sans', sans-serif;
    border-radius: 5px;
`