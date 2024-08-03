import Header from "./components/header"
import GameInfo from "./components/gameinfo"
import GameArea from "./components/gamearea"

function App() {
  window.onload = () => {
    sessionStorage.removeItem("token")
  }
  return (
    <>
      <Header />
      <GameInfo gameid={"1234"} />
      <GameArea shading={true} />
    </>

  )
}

export default App
