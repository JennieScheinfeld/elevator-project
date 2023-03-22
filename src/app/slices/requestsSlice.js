import { createSlice } from '@reduxjs/toolkit'
import { numOfFloors } from '../constants'


let floorIds = Array.from({ length: numOfFloors }, (_, index) => index);  

export const STATUSES = {
  Call: "Call",
  Arrived: "Arrived",
  Waiting: "Waiting"

}

const buttonStatuses = floorIds.reduce((accu, index) => {
  accu[index] = {
      status: STATUSES.Call,
      elevatorId: null
        }
  return accu
}, {})


const initialState = buttonStatuses
export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
        const { buttonId, status} = action.payload
        state[buttonId].status = STATUSES[status]
    },
    updateElevatorId: (state, action) => {
      const { buttonId, elevatorId} = action.payload
      state[buttonId].elevatorId = elevatorId
  }
  },
})

export const { updateStatus, updateElevatorId } = requestsSlice.actions

export default requestsSlice.reducer