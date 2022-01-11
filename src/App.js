import './App.css';
import { useEffect, useState } from 'react';
import get from './service';
import { ALL_ADVANCEMENTS } from './utils';
import AdvancementList from './components/AdvancementList';

function App() {
  const [completedAdvancements
    , setCompletedAdvancements] = useState({})
  const [userAdvancements, setUserAdvancements] = useState(null)
  const [progressInAdvancements, setProgressInAdvancements] = useState(null)

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
      const uploadedAndRemovedAdvancements = removeUnusedAdvancements(uploadedAdvancements)
      setUserAdvancements(uploadedAndRemovedAdvancements)
    }
    fileReader.onerror = () => {
      console.error('error parsing!')
    }
  }

  function removeUnusedAdvancements(uploadedAdvancements) {
    const cleanAdvacements = {}
    ALL_ADVANCEMENTS.forEach(advancement => {
      cleanAdvacements[advancement] = uploadedAdvancements[advancement].criteria
    })
    return cleanAdvacements
  }

  useEffect(() => {
    if (userAdvancements != null)
      getMissingAdvancements()
  }, [userAdvancements])

  function getMissingAdvancements() {
    const missing = {}
    ALL_ADVANCEMENTS.forEach((advancement) => {
      const userProgressInAdvancement = userAdvancements[advancement]
      missing[advancement] = getMissingFromAdvancement(advancement, userProgressInAdvancement)
    })
    setProgressInAdvancements(missing)
  }

  function getMissingFromAdvancement(advancement, progress) {
    const missing = []
    for (const name in completedAdvancements[advancement].criteria) {
      if (!(name in progress)) {
        missing.push(name)
      }
    }
    return missing
  }

  return (
    < div className="App" >
      <div>
        <input type="file"
          onChange={fileChange}
        />
      </div>
      <AdvancementList progressInAdvancements={progressInAdvancements} />
    </div >
  );
}

export default App;
