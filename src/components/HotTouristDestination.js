import { useEffect, useState } from "react"

function HotTouristDestination(props) {

  const [missingBiomes, setMissingBiomes] = useState([])

  useEffect(() => {
    debugger
    setMissingBiomes(props.missingBiomes)
  }, [])

  return (
    <div>
      {missingBiomes.map((biome, key) => {
        return <div key={key}> {biome} </div>
      })}
    </div>
  )
}

export default HotTouristDestination
