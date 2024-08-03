
function GameInfo(props) {
    return (
        <div class="gameinfo">
            <div className="gameid">
                <p> Game ID: <strong>{props.gameid}</strong> </p>
            </div>
            <div className="timer">
                <p>Timer: <strong>10:00</strong></p>
            </div>
        </div>
    )

}

export default GameInfo;