import Shading from "./shading"
import Block from "./block"
function GameArea(props) {
    let list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    return (
        <div className="gamearea">
            <div className="blocks">
                {
                    list.map((item) => {
                        return <Block id={item} key={item} />
                    })
                }
            </div>
            {props.shading ? <Shading /> : null}
        </div>
    )
}

export default GameArea;