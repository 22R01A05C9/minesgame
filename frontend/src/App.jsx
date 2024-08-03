import Header from "./components/header"
import GameInfo from "./components/gameinfo"
import GameArea from "./components/gamearea"
import Options from "./components/options"
import Footer from "./components/footer"

function App() {
  window.onload = () => {
    sessionStorage.removeItem("token")
  }
  return (
    <>
      <Header />
      <GameInfo gameid={"1234"} />
      <GameArea shading={true} />
      <Options />
    </>

  )
}

export default App
