import { useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook';

const Timer = ({ shouldStart, shouldStop }) => {
    const {
      seconds,
      minutes,
      start,
      pause,
    } = useStopwatch({ autoStart: false });
  

    useEffect(() => {
      if (shouldStart) {
        start()
      }
      if (shouldStop) {
        pause()
      }
    }, [shouldStart, shouldStop])
    
    const minutesStr = `${minutes > 0 ? minutes + " min. " : ""}`
    const secondsStr = `${seconds > 0 ? seconds + " sec." : ""}`
      return (
         <span style={{ alignText: "center", fontSize: "12px", height: "1em", width: "1em", whiteSpace: "nowrap", marginBottom: "30px"}}>{minutesStr + secondsStr}</span>
      )
}

export default Timer