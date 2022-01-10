import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import get from './service';
import { HOT_TOURIST_DESTINATION, ADVENTURING_TIME, ALL_ADVANCEMENTS } from './utils';
import HotTouristDestination from './components/HotTouristDestination';

function App() {
  const [completedAdvancements
    , setCompletedAdvancements] = useState({})
  const [userAdvancements, setUserAdvancements] = useState(null)
  const [missingAdvancements, setMissingAdvancements] = useState(null)

  useEffect(async () => {
    const advancements = await getCompletedAchievements()
    setCompletedAdvancements(advancements)
  }, [])

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

  useEffect(() => {
    if (userAdvancements != null)
      getMissing()
  }, [userAdvancements])

  function getMissing() {
    const missing = {}
    for (const advancement in ALL_ADVANCEMENTS) {
      const advancementName = ALL_ADVANCEMENTS[advancement]
      const userProgressInAdvancement = userAdvancements[advancementName].criteria
      missing[advancement] = getMissingFromAdvancement(advancementName, userProgressInAdvancement)
    }
    setMissingAdvancements(missing)
  }

  function getMissingFromAdvancement(advancementName, progress) {
    const missing = []
    for (const name in completedAdvancements[advancementName].criteria) {
      if (!(name in progress)) {
        missing.push(name)
      }
    }
    return missing
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
        {missingAdvancements == null ?
          <div>

          </div>
          :
          <div>
            <HotTouristDestination
              missingBiomes={missingAdvancements.HOT_TOURIST_DESTINATION} />
          </div>}
      </header>
    </div >
  );
}

export default App;
