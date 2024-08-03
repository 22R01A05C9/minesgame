import Shading from "./shading"

function GameArea(props) {
    return (
        <div className="gamearea">
            <div className="blocks">
                <div className="block 0"></div>
                <div className="block 1"></div>
                <div className="block 2"></div>
                <div className="block 3"></div>
                <div className="block 4"></div>
                <div className="block 5"></div>
                <div className="block 6"></div>
                <div className="block 7"></div>
                <div className="block 8"></div>
                <div className="block 9"></div>
                <div className="block 10"></div>
                <div className="block 11"></div>
                <div className="block 12"></div>
                <div className="block 13"></div>
                <div className="block 14"></div>
                <div className="block 15"></div>
            </div>
            {props.shading ? <Shading /> : null}
        </div>
    )
}

export default GameArea;