function Star({i, clickedstar}){
    return (
        <div className={"star ss"+i} onClick={clickedstar}>
            <svg className="s1" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg>
            <svg className="s2" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" /></svg>
        </div>
    )
}


function Feedback({application}) {
    let rating = 0;
    const clickedstar = (e) => {
        document.querySelector(".give").style.display = "none"
        document.querySelectorAll(".star").forEach((value) => {
            value.querySelector(".s2").style.display = "none"
            value.querySelector(".s1").style.display = "block"
        })
        let svg = e.target
        if (e.target.querySelector("path") === null) {
            svg = e.target.parentNode;
        }
        let div = svg.parentNode;
        let num = div.className.split(" ")[1].substring(2,)
        let arr = []
        for (let i = 1; i <= num; i++) {
            arr.push(i)
        }
        arr.forEach((value) => {
            document.querySelector(`.star.ss${value} .s2`).style.display = "block"
            document.querySelector(`.star.ss${value} .s1`).style.display = "none"
        })
        rating = num
    }
    const givenrating = () => {
        document.querySelector(".thankyoudiv").style.display = "block"
        document.querySelector(".feedbackdiv").style.display = "none"
    }

    const submit = () => {
        if (rating === 0) {
            document.querySelector(".give").style.display = "block"
        } else {
            fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ stars: rating, suggestion: document.querySelector("textarea").value, application:application })
            }).then(res => res.json()).then((data) => {
                if (data.msg === "Success") {
                    givenrating()
                }
            })
        }
    }

    const clickedthankyou = () => {
        document.querySelector(".thankyoudiv").style.display = "none"
        localStorage.setItem(application+"feedback", "true")
    }
    return (
        <div className="mainfeedback">
            <div className="feedbackdiv">
                <div className="feedback">
                    <h3>Feedback</h3>
                    <p>Please Rate Your Experience!</p>
                    <div className="stars">
                        {[1,2,3,4,5].map((item)=>{
                            return <Star key={item} i={item.toString()}  clickedstar={clickedstar} />
                        })}
                    </div>
                    <p className="give">Please Give Rating</p>
                    <p>Any Suggestions?</p>
                    <textarea name="suggestion" rows={"3"}></textarea>
                    <button onClick={submit}>Submit</button>
                </div>
            </div>
            <div className="thankyoudiv">
                <div className="thankyou">
                    <p>Thank You!</p>
                    <button onClick={clickedthankyou}>Ok!</button>
                </div>
            </div>
        </div>
    )
}

export default Feedback;