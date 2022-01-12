import { useState, useEffect } from "react";
import { ADVANCEMENTS_NAMES } from "../utils";
import CompletedAchievement from './CompletedAdvancement'
import AdvancementHeader from "./AdvancementHeader";
import get from "../service";


const Advancement = (props) => {
  const [missingProgress, setMissingProgress] = useState([])
  const [title, setTitle] = useState('')
  const [criteria, setCriteria] = useState(null)

  useEffect(() => {
    setMissingProgress(props.missingProgress)
    setTitle(props.title)
  }, [props]);

  useEffect(() => {
    const fetchAdvancementCriteria = async () => {
      const criteria = await get(ADVANCEMENTS_NAMES[title].jsonPath)
      setCriteria(criteria)
    }
    if (title !== '') {
      fetchAdvancementCriteria()
    }
  }, [title])

  return (
    <div>
      <hr></hr>
      {criteria === null ? '' :
        <div>
          <AdvancementHeader advancement={ADVANCEMENTS_NAMES[title]} />

          {missingProgress.length === 0 ? <CompletedAchievement /> :
            <div>
              <ul>
                {
                  missingProgress.map((advancement, key) => {
                    return <li key={key}>
                      {/* {criteria[advancement] === undefined ? 'nota' : criteria[advancement].name} */}
                      <div style={{
                        backgroundImage: `url('${ADVANCEMENTS_NAMES[title].albumPath}')`,
                        backgroundPosition: criteria[advancement].positions,
                        width: '16px',
                        height: '16px',
                        display: 'inline-block',
                        marginRight: '1%',
                      }}></div>
                      {criteria[advancement].name}
                    </li>
                  })
                }
              </ul>
            </div>}
        </div>
      }
    </div>
  );
}

export default Advancement;