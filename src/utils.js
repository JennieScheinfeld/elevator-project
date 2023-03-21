import elevatorBellAudio from './ElevatorBell.mp3'

export const playBellSound = () => {
    new Audio(elevatorBellAudio).play()
}