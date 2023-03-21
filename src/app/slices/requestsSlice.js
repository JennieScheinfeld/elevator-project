import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { numOfFloors } from '../constants'


let floorIds = Array.from({ length: numOfFloors }, (_, index) => index);  

export const STATUSES = {
  Call: "Call",
  Arrived: "Arrived",
  Waiting: "Waiting"

}

const buttonStatuses = floorIds.reduce((accu, index) => {
  accu[index] = {
      status: STATUSES.Call
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
    }
  },
})

export const { updateStatus } = requestsSlice.actions

export default requestsSlice.reducer