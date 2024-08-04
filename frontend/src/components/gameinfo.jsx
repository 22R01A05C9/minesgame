import { useRef, useEffect } from "react";
function GameInfo(props) {
    const TimerRef = useRef();
    const settimer = (interval) => {
        let c = TimerRef.current.querySelector("p").innerHTML
        let currenttime = ((c.substring(7.)).replace("<strong>", "")).replace("</strong>", "").split(":")
        currenttime[0] = parseInt(currenttime[0])
        currenttime[1] = parseInt(currenttime[1])
        if (currenttime[0] === 0 && currenttime[1] === 0) {
            clearInterval(interval)
            TimerRef.current.querySelector("p").innerHTML = "Timer: <strong>10:00</strong>"
            props.gameexpired()
            return;
        }
        if (currenttime[1] === 0) {
            currenttime[1] = 59
            currenttime[0] = currenttime[0] - 1
        }
        else {
            currenttime[1] = currenttime[1] - 1
        }
        if (currenttime[1] <= 9) {
            TimerRef.current.querySelector("p").innerHTML = "Timer: <strong>" + currenttime[0] + ":0" + currenttime[1] + "</strong>"
        } else {
            TimerRef.current.querySelector("p").innerHTML = "Timer: <strong>" + currenttime[0] + ":" + currenttime[1] + "</strong>"
        }
    }

    useEffect(() => {
        if (props.gamestarted) {
            let interval = setInterval(() => settimer(interval), 1000)
            props.setinterval(interval)
        }
    }, [props.gamestarted])

    return (
        <div className="gameinfo">
            <div className="gameid">
                <p> Game ID: <strong>1234</strong> </p>
            </div>
            <div className="maxscore">
                <p>Max Scored: <strong>{props.maxScore}</strong></p>
            </div>
            <div className="timer" ref={TimerRef}>
                <p>Timer: <strong>10:00</strong></p>
            </div>
            <div className="currentscore">
                <p>Score: <strong>{props.score}</strong></p>
            </div>
        </div>
    )

}

export default GameInfo;