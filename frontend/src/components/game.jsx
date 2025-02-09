import GameArea from "./gamearea"
import GameInfo from "./gameinfo"
import Options from "./options"
import Resetscore from "./resetscore"


function Game({gameexpired, score, maxScore, setinterval, secmsg, gamestarted, setscore, startgame, expired, clicked, clickedgameover}){
    return (
        <div className="game">
            <div className="maingame">
				<GameInfo gamestarted={gamestarted} gameexpired={gameexpired} score={score} maxScore={maxScore} setinterval={setinterval} />
				<GameArea secmsg={secmsg} gamestarted={gamestarted} setscore={setscore} startgame={startgame} expired={expired} clickedgameover={clickedgameover} score={score} clicked={clicked} />
			</div>
			<Options gamestarted={gamestarted} />
			<Resetscore />
        </div>
        
    )
}

export default Game