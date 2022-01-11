import { useState, useEffect } from "react";
import CompletedAchievement from './CompletedAdvancement'

const Advancement = (props) => {
  const [missingProgress, setMissingProgress] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    setMissingProgress(props.missingProgress)
    setTitle(props.title)
  }, [props]);

  return (
    <div>
      <hr></hr>
      {title}
      {missingProgress.length === 0 ? <CompletedAchievement /> :
        <div>
          <ul>
            {
              missingProgress.map((advancement, key) => {
                return <li key={key}> {advancement}</li>
              })
            }
          </ul>
        </div>}
    </div>
  );
}

export default Advancement;