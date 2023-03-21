import { configureStore } from '@reduxjs/toolkit';
import elevatorChartReducer from './slices/elevatorChartSlice'
import requestsReducer from './slices/requestsSlice'

export const store = configureStore({
  reducer: {
    elevatorChart: elevatorChartReducer,
    requests: requestsReducer
  },
});
