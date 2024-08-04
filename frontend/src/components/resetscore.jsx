import { useState } from "react"
import Warning from "./warning"
function Resetscore() {

    let [show, setshow] = useState(false);
    const clickedyes = () => {
        localStorage.setItem("maxScore", 0);
        window.location.reload();
    }

    return (
        <div className="resetdiv">
            <button className="reset" onClick={() => { setshow(true) }}>Reset Highest Score</button>
            {show ? <Warning msg={"Are You Sure You Want To Reset Maximum Score ?"} yes={clickedyes} no={() => { setshow(false) }} /> : null}
        </div>
    )
}

export default Resetscore;