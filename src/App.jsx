import { useState } from "react"
import "./app.scss"
import Dock from "./components/Dock"
import Navbar from "./components/Navbar"
import Github from "./components/Windows/Github"
import Note from "./components/Windows/Note"
import Resume from "./components/Windows/Resume"
import Spotify from "./components/Windows/Spotify"
import Cli from "./components/Windows/Cli"
import { resume } from "react-dom/server"


const App = () => {
  const [WindowsState, setWindowsState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false
  })

  return (
    <main>
      <Navbar/>
      <Dock WindowsState={WindowsState} setWindowsState={setWindowsState}/>
      {WindowsState.note && <Note windowName="note"  setWindowsState={setWindowsState}/>}
      {WindowsState.github && <Github windowName="github" setWindowsState={setWindowsState}/>} 
      {WindowsState.resume && <Resume windowName="resume"  setWindowsState={setWindowsState}/>}
     {WindowsState.spotify && <Spotify windowName="spotify"  setWindowsState={setWindowsState}/>}
      {WindowsState.cli && <Cli windowName="cli" setWindowsState={setWindowsState}/>}
    </main>
  )
}
export default App
