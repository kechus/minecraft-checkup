async function get(route) {
  const data = await fetch(route)
  const parsedData = await data.json()
  return parsedData
}

export default get