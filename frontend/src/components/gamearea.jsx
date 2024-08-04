import Shading from "./shading"
import Block from "./block"
function GameArea(props) {
    let list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    return (
        <div className="gamearea">
            <div className="blocks">
                {
                    list.map((item) => {
                        return <Block id={item} key={item} clicked={props.clicked} />
                    })
                }
            </div>
            {props.gamestarted ? null : <Shading message={"Start Game!"} click={props.startgame} />}
            {props.expired ? <Shading message={"Game Over! Click To Restart"} secmsg={props.secmsg ? props.secmsg : null} score={props.score} click={props.clickedgameover} /> : null}
        </div>
    )
}

export default GameArea;