import { useState } from "react"
import Warning from "./warning"
function Resetscore() {

    let [show, setshow] = useState(false);
    const clickedyes = () => {
        localStorage.setItem("minesstatistics", null);
        window.location.reload();
    }

    return (
        <div className="resetdiv">
            <button className="reset" onClick={() => { setshow(true) }}>Reset Statistics</button>
            {show ? <Warning msg={"Are You Sure You Want To Reset Statistics ?"} yes={clickedyes} no={() => { setshow(false) }} /> : null}
        </div>
    )
}

export default Resetscore;