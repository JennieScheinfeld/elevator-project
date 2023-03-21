import { StyledButton} from "./style"
import { useSelector } from "react-redux"

const statusParams = {
    Call: {
        backgroundColor: "#0bda92",
        color: "white",
        border: "none",
        text: "Call"
    },
    Waiting: {
        backgroundColor: "#e53a3a",
        color: "white",
        border: "none",
        text: "Waiting"
    },
    Arrived: {
        backgroundColor: "none",
        color: "#0bda92",
        border: "1px solid #0bda92",
        text: "Arrived"
    }
}
export const Button = ({ id, onClick}) => {
    const {requests} = useSelector(state => state)
    const status = requests[id].status

    return <StyledButton params={statusParams[status]} onClick={onClick}>
        {statusParams[status].text }
    </StyledButton>
}