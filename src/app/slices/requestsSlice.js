import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const STATUSES = {
  Call: "Call",
  Arrived: "Arrived",
  Waiting: "Waiting"

}
const buttonStatuses = [0,1,2,3,4,5,6,7,8,9].reduce((accu, index) => {
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