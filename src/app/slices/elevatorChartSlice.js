import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const elevatorChart = [0,1,2,3,4].reduce((accu, index) => {
    accu[index] = {
        level: 0,
        occupied: false
    }
    return accu
}, {})


const initialState = {
    elevatorChart,
    numAvailableElevators: 1,
    elevatorsAvailable: Object.keys(elevatorChart).length > 0
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