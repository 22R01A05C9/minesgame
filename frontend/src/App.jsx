import { useState } from "react";
function App() {
  const [msg, setMsg] = useState("")

  const clicked = () => {
    sessionStorage.setItem("token", "123");
    setMsg(sessionStorage.getItem("token"))
  }
  return (
    <>
      {
        window.onload = () => {
          sessionStorage.setItem("token", "");
        }
      }
      <button onClick={clicked}>Click Me</button>
      <p>{msg}</p>
    </>

  )
}

export default App
