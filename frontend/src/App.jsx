import Header from "./components/header"
import GameInfo from "./components/gameinfo"
import GameArea from "./components/gamearea"
import Options from "./components/options"
import Footer from "./components/footer"
import { useState } from "react"
function App() {
  let [gamestarted, setgamestarted] = useState(false)
  let [expired, setexpired] = useState(false)
  let [score, setscore] = useState(0)
  window.onload = () => {
    sessionStorage.removeItem("token")
  }
  const startgame = () => {
    console.log("game started")
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
    <>
      <Header />
      <GameInfo gameid={"1234"} gamestarted={gamestarted} gameexpired={gameexpired} score={score} />
      <GameArea gamestarted={gamestarted} startgame={startgame} expired={expired} clickedgameover={clickedgameover} score={score} />
      <Options />
      <Footer />
    </>

  )
}

export default App
