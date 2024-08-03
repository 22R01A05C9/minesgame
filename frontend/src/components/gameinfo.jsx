
function GameInfo(props) {
    return (
        <div className="gameinfo">
            <div className="gameid">
                <p> Game ID: <strong>{props.gameid}</strong> </p>
            </div>
            <div className="maxscore">
                <p>Max Scored: <strong>0</strong></p>
            </div>
            <div className="timer">
                <p>Timer: <strong>10:00</strong></p>
            </div>
            <div className="currentscore">
                <p>Score: <strong>0</strong></p>
            </div>
        </div>
    )

}

export default GameInfo;