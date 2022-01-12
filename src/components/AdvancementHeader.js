import { useState, useEffect } from "react";
import { IMAGE_PATHS } from "../utils";

const trophyHolder = {
  display: 'inline-block',
  backgroundImage: `url('${IMAGE_PATHS.FRAME}')`,
  width: '52px',
  height: '52px',
  position: 'relative',
}

const container = {
  display: 'flex',
  alignItems: 'center'
}

const AdvancementHeader = (props) => {
  const [advancementObj, setAdvancementObj] = useState(props.advancementObj)

  useEffect(() => {
    setAdvancementObj(props.advancementObj)
  }, [props])

  function createTrophy() {
    return {
      backgroundImage: `url('${IMAGE_PATHS.INV}')`,
      backgroundPosition: advancementObj.imagePosition,
      width: '32px',
      height: '32px',
      position: 'absolute',
      left: '10px',
      top: '10px'
    }
  }

  return (
    <div style={container}>
      <div style={trophyHolder}>
        <div
          style={createTrophy()}
        ></div>
      </div>
      {
        advancementObj.name
      }
    </div>
  )

}

export default AdvancementHeader;