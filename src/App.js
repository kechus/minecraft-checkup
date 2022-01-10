import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import get from './service';


function App() {
  const [completedAdvancements
    , setCompletedAdvancements] = useState({})
  const [userAdvancements, setUserAdvancements] = useState(null)

  useEffect(async () => {
    const advancements = await getCompletedAchievements()
    setCompletedAdvancements(advancements)
  }, [])

  useEffect(() => {
    if (userAdvancements != null)
      getMissingAdvancements()
  }, [userAdvancements])

  async function getCompletedAchievements() {
    const achievements = await get('completed.json')
    return achievements
  }

  const fileChange = (event) => {
    const file = event.target.files[0]
    if (fileTypeIsJSON(file)) {
      tryParsingFile(file)
    } else {
      console.error('invalido!')
    }
  }

  function fileTypeIsJSON(userFile) {
    return userFile.type === 'application/json'
  }

  function tryParsingFile(userFile) {
    const fileReader = new FileReader()
    fileReader.readAsText(userFile)
    fileReader.onload = () => {
      const uploadedAdvancements = JSON.parse(fileReader.result)
      setUserAdvancements(uploadedAdvancements)
    }
    fileReader.onerror = () => {
      console.error('error parsing!')
    }
  }

  function getMissingAdvancements() {
    userAdvancements.hasOwnProperty('')
  }

  return (
    < div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input type="file"
            onChange={fileChange}
          />
        </div>
      </header>
    </div >
  );
}

export default App;
