import { useState, useEffect } from "react";
import CompletedAchievement from './CompletedAdvancement'
import AdvancementHeader from "./AdvancementHeader";
import get from "../service";
import SingleCriteria from "./SingleCriteria";


const Advancement = (props) => {
  const [missingCriteriaPoints, setMissingCriteriaPoint] = useState(props.missingCriteriaPoints.sort())
  const [advancementObj, setAdvancementObj] = useState(props.advancementObj)
  const [criteria, setCriteria] = useState(null)

  useEffect(() => {
    setMissingCriteriaPoint(props.missingCriteriaPoints.sort())
    setAdvancementObj(props.advancementObj)
  }, [props]);

  useEffect(() => {
    const fetchAdvancementCriteria = async () => {
      const criteria = await get(advancementObj.jsonPath)
      setCriteria(criteria)
    }
    fetchAdvancementCriteria()
  }, [advancementObj])

  return criteria === null ? '' :
    <div>
      <hr></hr>
      <AdvancementHeader advancementObj={advancementObj} />

      {missingCriteriaPoints.length === 0 ? <CompletedAchievement /> :
        <ul>
          {
            missingCriteriaPoints.map((criteriaPoint, key) => {
              return <SingleCriteria key={key}
                criteriaValues={criteria[criteriaPoint]}
                imagePath={advancementObj.albumPath}
              />
            })
          }
        </ul>}
    </div>

}

export default Advancement;