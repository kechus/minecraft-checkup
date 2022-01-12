import { useState, useEffect, useRef } from "react";
import { ADVANCEMENTS_NAMES } from "../utils";
import CompletedAchievement from './CompletedAdvancement'
import AdvancementHeader from "./AdvancementHeader";

const Advancement = (props) => {
  const [missingProgress, setMissingProgress] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    setMissingProgress(props.missingProgress)
    setTitle(props.title)
  }, [props]);

  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);


  return (
    <div>
      <hr></hr>
      {isMountRef.current ? '' :
        <div>
          <AdvancementHeader advancement={ADVANCEMENTS_NAMES[title]} />

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
      }
    </div>
  );
}

export default Advancement;