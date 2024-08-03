import diamond from "../assets/images/diamond.png"
import bomb from "../assets/images/goodbomb.png"
function Block(props) {

    return (
        <div className={"block a" + props.id}>
            <img src={diamond} className={"diamond"} />
            <img src={bomb} className="bomb" />
        </div>
    )
}

export default Block;