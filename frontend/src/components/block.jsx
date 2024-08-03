import diamond from "../assets/images/diamond.png"
import bomb from "../assets/images/goodbomb.png"
function Block(props) {
    return (
        <div className={"block a" + props.id} onClick={props.clicked}>
            <img src={diamond} className={"diamond"} />
            <img src={bomb} className="bomb" />
        </div>
    )
}

export default Block;