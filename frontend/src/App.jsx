import Header from "./components/header"
import GameInfo from "./components/gameinfo"
import GameArea from "./components/gamearea"
import Options from "./components/options"
import Footer from "./components/footer"
import { useState } from "react"
function App() {
	let maxScore = localStorage.getItem("maxScore") || 0;
	let [gamestarted, setgamestarted] = useState(false)
	let [expired, setexpired] = useState(false)
	let [score, setscore] = useState(0)
	window.onload = () => {
		sessionStorage.removeItem("token")
	}
	const startgame = () => {
		let mines = 1;
		document.querySelectorAll(".buttons button").forEach((value) => {
			if (value.classList.contains("acive")) {
				mines = value.innerHTML;
			}
		})
		console.log(mines);
		setgamestarted(true);
	}

	const clickedgameover = () => {
		setgamestarted(false);
		setexpired(false);
	}

	const gameexpired = () => {
		setexpired(true)

	}



	return (
		<div className="game">
			<Header />
			<GameInfo gameid={"1234"} gamestarted={gamestarted} gameexpired={gameexpired} score={score} maxScore={maxScore} />
			<GameArea gamestarted={gamestarted} setscore={setscore} startgame={startgame} expired={expired} clickedgameover={clickedgameover} score={score} />
			<Options gamestarted={gamestarted} />
			<Footer />
		</div>

	)
}

export default App
