import './App.css';
import { useEffect, useState } from 'react';
import get from './service';
import { ALL_ADVANCEMENTS } from './utils';
import AdvancementList from './components/AdvancementList';
import About from './components/About';
import FileInfo from './components/FileInfo'
import Footer from './components/Footer';
import Error from './components/Error';

function App() {
  const [completedAdvancements, setCompletedAdvancements] = useState({})
  const [userAdvancements, setUserAdvancements] = useState(null)
  const [
    missingProgressInAdvancements,
    setMissingProgressInAdvancements
  ] = useState(null)
  const [showError, setToggleShowError] = useState(false)

  useEffect(() => {
    async function getCompletedAdvancements() {
      const advancements = await get('completed.json')
      setCompletedAdvancements(advancements)
    }
    getCompletedAdvancements()
  }, [])

  const fileChange = (event) => {
    const file = event.target.files[0]
    if (fileTypeIsJSON(file)) {
      tryParsingFile(file)
    } else {
      showErrorMessage()
    }
  }

  function showErrorMessage() {
    setToggleShowError(true)
    setTimeout(hideErrorMessage, 3000)
  }

  function hideErrorMessage() {
    setToggleShowError(false)
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
      console.error('error reading!')
    }
  }

  function removeUnusedAdvancements(uploadedAdvancements) {
    const cleanAdvacements = {}
    ALL_ADVANCEMENTS.forEach(advancementName => {
      if (uploadedAdvancements[advancementName] === undefined) {
        cleanAdvacements[advancementName] = {}
      } else {
        cleanAdvacements[advancementName] = uploadedAdvancements[advancementName].criteria
      }
    })
    return cleanAdvacements
  }

  useEffect(() => {
    function getMissingAdvancements() {
      const missing = {}
      ALL_ADVANCEMENTS.forEach((advancementName) => {
        const userProgressInAdvancement = userAdvancements[advancementName]
        missing[advancementName] = getMissingFromAdvancement(advancementName, userProgressInAdvancement)
      })
      setMissingProgressInAdvancements(missing)
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

    if (userAdvancements != null)
      getMissingAdvancements()
  }, [userAdvancements, completedAdvancements])

  return (
    < div>
      <div className='panel'>
        <About />
      </div>

      <div className='panel'>
        <FileInfo />
        <div className='file-reader'>
          <input type="file"
            onChange={fileChange}
            className='input-file'
          />
        </div>
        <AdvancementList missingProgressInAdvancements={missingProgressInAdvancements} />
      </div>

      <div className='panel'>
        <Footer />
      </div>

      {showError ? <Error /> : ''}
    </div >
  );
}

export default App;
