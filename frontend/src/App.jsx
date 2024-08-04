import Header from "./components/header"
import GameInfo from "./components/gameinfo"
import GameArea from "./components/gamearea"
import Options from "./components/options"
import Footer from "./components/footer"
import Resetscore from "./components/resetscore"
import Feedback from "./components/feedback"
import successaudio from "./assets/music/success.mp3"
import failaudio from "./assets/music/fail.mp3"
import startaudio from "./assets/music/game-start.mp3"
import { useState } from "react"


function App() {
	let link = window.location.href.split(":")
	let maxScore = localStorage.getItem("maxScore") || 0;
	let [secmsg, setsecmsg] = useState(null)
	let [interval, setinterval] = useState(null)
	let [gamestarted, setgamestarted] = useState(false)
	let [expired, setexpired] = useState(false)
	let [score, setscore] = useState(0)
	let [nclicked, setnclicked] = useState(0)
	window.onload = () => {
		sessionStorage.removeItem("token")
	}
	const startgame = () => {
		setsecmsg(null)
		setscore(0)
		setnclicked(0)
		new Audio(startaudio).play()
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
		fetch(link[0] + ":" + link[1] + ":5050/creategame", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				bombs: mines
			})
		}).then(res => res.json()).then((data) => {
			document.querySelector(".gameid p ").innerHTML = "Gameid: <strong>" + data.gameid + "</strong>"
			sessionStorage.setItem("token", data.token)
			setgamestarted(true);
		})

	}

	const clickedgameover = () => {
		if (localStorage.getItem("feedback") === null) {
			document.querySelector(".feedbackdiv").style.display = "block"
		}
		setgamestarted(false);
		setexpired(false);
	}

	const gameexpired = () => {
		setexpired(true)
	}

	const clicked = (e) => {
		if ((e.target.classList.contains("success")) || (e.target.classList.contains("fail")) || e.target.classList.contains("diamond") || e.target.classList.contains("bomb")) {
			return;
		}
		let blockid = e.target.className.split(" ")[1].substring(1)

		fetch(link[0] + ":" + link[1] + ":5050/getdata", {
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
				setnclicked((nclicked) => { return nclicked + 1 })
				if (nclicked + 1 === 16 - data.mines) {
					document.querySelectorAll(".blocks .block").forEach((value) => {
						if (!value.classList.contains("success")) {
							value.classList.add("fail")
						}
					})
					if (score > (parseInt(localStorage.getItem("maxScore")) || 0)) {
						localStorage.setItem("maxScore", score)
						setsecmsg("New High Score: ")
					}
					clearInterval(interval)
					document.querySelector(".timer p").innerHTML = "Timer: <strong>10:00</strong>"
					gameexpired()
				}
				setscore((score) => { return score + ((nclicked + 1) * parseInt(data.mines)) })
			} else {
				data.bombs.forEach((value) => {
					document.querySelector(`.a${value}`).classList.add("fail")
				})
				document.querySelectorAll(".blocks .block").forEach((value) => {
					if (!value.classList.contains("fail")) {
						value.classList.add("success")
					}
				})
				e.target.classList.add("fail")
				new Audio(failaudio).play()
				if (score > (parseInt(localStorage.getItem("maxScore")) || 0)) {
					localStorage.setItem("maxScore", score);
					setsecmsg("New High Score: ")
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
			<div className="maingame">
				<GameInfo gamestarted={gamestarted} gameexpired={gameexpired} score={score} maxScore={maxScore} setinterval={setinterval} />
				<GameArea secmsg={secmsg} gamestarted={gamestarted} setscore={setscore} startgame={startgame} expired={expired} clickedgameover={clickedgameover} score={score} clicked={clicked} />
			</div>
			<Options gamestarted={gamestarted} />
			<Resetscore />
			<Feedback />
			<Footer />
		</div>

	)
}

export default App
