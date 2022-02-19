import './App.css';
import { useEffect, useState } from 'react';
import get from './service';
import { ALL_ADVANCEMENTS } from './utils';
import AdvancementList from './components/AdvancementList';
import About from './components/About';
import FileHandler from './components/FileHandler';
import Footer from './components/Footer';


function App() {
  const [completedAdvancements, setCompletedAdvancements] = useState({})
  const [userAdvancements, setUserAdvancements] = useState(null)
  const [
    missingProgressInAdvancements,
    setMissingProgressInAdvancements
  ] = useState(null)

  useEffect(() => {
    async function getCompletedAdvancements() {
      const advancements = await get('completed.json')
      setCompletedAdvancements(advancements)
    }
    getCompletedAdvancements()
  }, [])

  const fileChanged = (uploadedAdvancements) => {
    const uploadedAndRemovedAdvancements = removeUnusedAdvancements(uploadedAdvancements)
    setUserAdvancements(uploadedAndRemovedAdvancements)
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
        <FileHandler onFileChange={fileChanged} />
        <AdvancementList missingProgressInAdvancements={missingProgressInAdvancements} />
      </div>

      <div className='panel'>
        <Footer />
      </div>
    </div >
  );
}

export default App;
