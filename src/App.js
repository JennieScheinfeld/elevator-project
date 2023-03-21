import React from 'react';
import './App.css';
import ElevatorSystemBase from './components/elevatorSystemBase/elevatorSystemBase'
import { numOfElevators, numOfFloors } from './app/constants';

function App() {
  return (
    <ElevatorSystemBase numOfElevators={numOfElevators} numOfFloors={numOfFloors}/>
  );
}
export default App;