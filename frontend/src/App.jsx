import Header from "./components/header"
import Choose from "./components/choose"
import Game from "./components/game"
import Statistics from "./components/stastics"
import successaudio from "./assets/music/success.mp3"
import failaudio from "./assets/music/fail.mp3"
import startaudio from "./assets/music/game-start.mp3"
import { lazy, useEffect, useState } from "react"
const Feedback = lazy(()=>import("./components/feedback"))
import "./index.css"
const getmaxscore = ()=>{
	let data = localStorage.getItem("minesstatistics")
	data = JSON.parse(data)
	return parseInt(data?.max) || 0 
}
const setstats =(s)=>{
	s=parseInt(s)
	let data = localStorage.getItem("minesstatistics")
	data = JSON.parse(data)
	if(data){
		data.max = Math.max(parseInt(data.max),s)
		data.min = Math.min(parseInt(data.min),s)
		data.avg = parseInt((parseInt(data.avg)*parseInt(data.total) + s) / (parseInt(data.total)+1))
		data.total = parseInt(data.total)+1
		let last = data.last
		if(last.length >= 10){
			last.shift()
		}
		last.push(s)
		data.last = last
		data = JSON.stringify(data)
	}else{
		data = JSON.stringify({max:s,total:1,avg:s,min:s,last:[s]})
	}
	localStorage.setItem("minesstatistics",data)
}
function App() {
    useEffect(()=>{
        document.title = "Mines Game";
		document.querySelector("link[rel~='icon']").href="/mines.svg"
		sessionStorage.removeItem("token")
    },[])
	let maxScore = getmaxscore()
	let [secmsg, setsecmsg] = useState(null)
	let [interval, setinterval] = useState(null)
	let [gamestarted, setgamestarted] = useState(false)
	let [expired, setexpired] = useState(false)
	let [score, setscore] = useState(0)
	let [nclicked, setnclicked] = useState(0)
	let [show, setshow] = useState("Game")
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
			if (value.classList.contains("activeoption")) {
				mines = value.innerHTML;
			}
		})
		fetch("/api/mines/creategame", {
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
		if (localStorage.getItem("minesfeedback") === null) {
			document.querySelector(".mainfeedback").style.display = "block"
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

		fetch("/api/mines/getdata", {
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
					let s = (score + ((nclicked + 1) * parseInt(data.mines)));
					if (s > getmaxscore()) {
						setsecmsg("New High Score: ")
					}
					clearInterval(interval)
					document.querySelector(".timer p").innerHTML = "Timer: <strong>10:00</strong>"
					setstats(s)
					gameexpired()
				}
				setscore((score) => { return score + ((nclicked + 1) * parseInt(data.mines)) })
			} else if(data.msg === "Game Not Found"){
				new Audio(failaudio).play()
				setsecmsg("Game Expired Or False Move")
				clearInterval(interval)
				document.querySelector(".timer p").innerHTML = "Timer: <strong>10:00</strong>"
				gameexpired()
			}
			else {
				data.bombs.forEach((value) => {
					document.querySelector(`.a${value}`).classList.add("fail")
				})
				document.querySelectorAll(".blocks .block").forEach((value) => {
					if (!value.classList.contains("fail")) {
						value.classList.add("success")
					}
				})
				if (data.msg === "Out") {
					e.target.classList.add("fail")
				}
				new Audio(failaudio).play()
				if (score > getmaxscore()) {
					setsecmsg("New High Score: ")
				}
				clearInterval(interval)
				document.querySelector(".timer p").innerHTML = "Timer: <strong>10:00</strong>"
				setstats(score)
				gameexpired()
			}

		})
	}

	return (
		<div className="game">
			<Header ext="/#" active="projects"/>
			<Choose setshow={setshow}/>
			<div className={show==="Game" ? "active" : "hidden"}>
				<Game gameexpired={gameexpired} score={score} maxScore={maxScore} setinterval={setinterval} secmsg={secmsg} gamestarted={gamestarted} setscore={setscore} startgame={startgame} expired={expired} clicked={clicked} clickedgameover={clickedgameover} />
			</div>
			<div className={show!=="Game" ? "active" : "hidden"}>
				<Statistics display={show!=="Game"}/>
			</div>
            {
                localStorage.getItem("minesfeedback") === null ? <Feedback application="mines"/> : null
            }
		</div>

	)
}

export default App
