import { useEffect, useRef } from "react";

function Options(props) {
    const buttonRef = useRef()
    function setlisteners() {
        const listener = (e) => {
            if (document.getElementsByClassName("shading")[0] === undefined) {
                return;
            }
            buttonRef.current.querySelector(".active").classList.remove("active")
            e.target.classList.add("active")
        }
        buttonRef.current.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", listener)
        })
    }

    useEffect(() => {
        setlisteners()
    }, [])



    return (
        <div className="options">
            <p>Select Number Of Mine's</p>
            <div className="buttons" ref={buttonRef}>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
            </div>
        </div>
    )
}

export default Options;