import { useEffect, useState } from "react";
import Advancement from "./Advancement";

const AdvancementList = (props) => {
  const [progressInAdvancements, setProgressInAdvancements] = useState(null)
  const [advancements, setAdvancements] = useState([])

  useEffect(() => {
    setProgressInAdvancements(props.progressInAdvancements)
  }, [props])

  useEffect(() => {
    if (progressInAdvancements != null) {
      const advancements = []
      for (const advancementName in progressInAdvancements) {
        advancements.push(
          <Advancement missingProgress={progressInAdvancements[advancementName]} title={advancementName} />
        )
      }
      setAdvancements(advancements)
    }

  }, [progressInAdvancements])

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