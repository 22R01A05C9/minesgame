import Header from "./components/header"
import GameInfo from "./components/gameinfo"
import GameArea from "./components/gamearea"
import Options from "./components/options"
import Footer from "./components/footer"
import successaudio from "./assets/music/success.mp3"
import failaudio from "./assets/music/fail.mp3"
import { useState } from "react"
function App() {

	let maxScore = localStorage.getItem("maxScore") || 0;
	let [interval, setinterval] = useState(null)
	let [gamestarted, setgamestarted] = useState(false)
	let [expired, setexpired] = useState(false)
	let [score, setscore] = useState(0)
	let [gameid, setgameid] = useState("1234")
	window.onload = () => {
		sessionStorage.removeItem("token")
	}
	const startgame = () => {
		console.log((window.location.href))
		document.querySelectorAll(".block").forEach((value) => {
			value.classList.remove("success")
			value.classList.remove("fail")
		})
		let mines = 1;
		document.querySelectorAll(".buttons button").forEach((value) => {
			if (value.classList.contains("active")) {
				mines = value.innerHTML;
			}
		})
		fetch("http://localhost:5050/creategame", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				bombs: mines
			})
		}).then(res => res.json()).then((data) => {
			setgameid(data.gameid)
			sessionStorage.setItem("token", data.token)
			setgamestarted(true);
		})

	}

	const clickedgameover = () => {
		setscore(0)
		setgamestarted(false);
		setexpired(false);
	}

	const gameexpired = () => {
		setexpired(true)
	}

	const clicked = (e) => {
		let blockid = e.target.className.split(" ")[1].substring(1)
		fetch("http://localhost:5050/getdata", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				token: sessionStorage.getItem("token"),
				move: blockid
			})
		}).then(res => res.json()).then((data) => {
			if (data.msg === "Safe") {
				e.target.classList.add("success")
				new Audio(successaudio).play()
				setscore((score) => { return score + 1 })
			} else {
				e.target.classList.add("fail")
				new Audio(failaudio).play()
				if (score > (parseInt(localStorage.getItem("maxScore")) || 0)) {
					localStorage.setItem("maxScore", score)
				}
				clearInterval(interval)
				document.querySelector(".timer p").innerHTML = "Timer: <strong>10:00</strong>"
				gameexpired()
			}

		})
	}

	return (
		<div className="game">
			<Header />
			<GameInfo gameid={gameid} gamestarted={gamestarted} gameexpired={gameexpired} score={score} maxScore={maxScore} setinterval={setinterval} />
			<GameArea gamestarted={gamestarted} setscore={setscore} startgame={startgame} expired={expired} clickedgameover={clickedgameover} score={score} clicked={clicked} />
			<Options gamestarted={gamestarted} />
			<Footer />
		</div>

	)
}

export default App
