import Header from "./components/header"
function App() {
  window.onload = () => {
    sessionStorage.removeItem("token")
  }
  return (
    <>
      <Header />
    </>

  )
}

export default App
