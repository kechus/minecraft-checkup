import { useEffect, useState, useRef } from "react";

const AdvancementCard = (props) => {
  const [advancement, setAdvancement] = useState('')
  const [criteria, setCriteria] = useState(null)

  useEffect(() => {
    setCriteria(props.criteria)
    setAdvancement(props.advancement)
  }, [props])

  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);

  return isMountRef.current ? '' :
    <div>
      {advancement}
    </div>
}

export default AdvancementCard;