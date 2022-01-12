import { useEffect, useState } from "react";
import Advancement from "./Advancement";
import { ADVANCEMENTS_NAMES } from "../utils";

const AdvancementList = (props) => {
  const [
    missingProgressInAdvancements,
    setMissingProgressInAdvancements
  ] = useState(props.missingProgressInAdvancements)
  const [advancements, setAdvancements] = useState([])

  useEffect(() => {
    setMissingProgressInAdvancements(props.missingProgressInAdvancements)
  }, [props])

  useEffect(() => {
    function createAdvancementsList() {
      const advancements = []
      for (const advancementName in missingProgressInAdvancements) {
        const advancement = <Advancement
          missingCriteriaPoints={missingProgressInAdvancements[advancementName]}
          advancementObj={ADVANCEMENTS_NAMES[advancementName]} />
        advancements.push(advancement)
      }
      setAdvancements(advancements)
    }

    createAdvancementsList()
  }, [missingProgressInAdvancements])

  return (
    <div>
      {advancements.map((advancement, key) => {
        return <div key={key}> {advancement} </div>
      })
      }
    </div>
  )
}

export default AdvancementList;