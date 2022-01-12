import { useEffect, useState } from "react";

const SingleCriteria = (props) => {
  const [criteriaValues, setCriteriaValues] = useState(props.criteriaValues)
  const [imagePath, setImagePath] = useState(props.imagePath)

  useEffect(() => {
    setCriteriaValues(props.criteriaValues)
    setImagePath(props.imagePath)
  }, [props])

  function createIconStyle() {
    return {
      backgroundImage: `url('${imagePath}')`,
      backgroundPosition: criteriaValues.positions,
      width: '16px',
      height: '16px',
      display: 'inline-block',
      marginRight: '1%',
    }
  }

  return (
    <li>
      <div style={createIconStyle()}></div>
      {criteriaValues.name}
    </li>
  );
}

export default SingleCriteria;