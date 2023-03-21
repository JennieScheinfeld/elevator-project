import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { numOfElevators } from '../constants'

let elevatorIds = Array.from({ length: numOfElevators }, (_, index) => index);  

const elevatorChart = elevatorIds.reduce((accu, index) => {
    accu[index] = {
        level: 0,
        occupied: false
    }
    return accu
}, {})


const initialState = {
    elevatorChart,
    numAvailableElevators: numOfElevators,
    elevatorsAvailable: numOfElevators > 0
}
export const elevatorChartSlice = createSlice({
  name: 'elevatorChart',
  initialState,
  reducers: {
    updateLevel: (state, action) => {
        const { elevatorId, level} = action.payload
        state.elevatorChart[elevatorId] =  {
            level,
            occupied: true
        }
        state.elevatorsAvailable = state.numAvailableElevators - 1 > 0
        state.numAvailableElevators = state.numAvailableElevators - 1
    },
    updateOccupied: (state, action) => {
      const {elevatorId, occupied} = action.payload
      state.elevatorChart[elevatorId].occupied =  occupied
      state.elevatorsAvailable = true
      state.numAvailableElevators = state.numAvailableElevators + 1
    }
  },
})

export const { updateLevel, updateOccupied } = elevatorChartSlice.actions

export default elevatorChartSlice.reducer