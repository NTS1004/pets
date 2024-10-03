const handleUpdate = (json, type) => {
  let results = []
  for (let i in json) {
    let value = json[i]
    if (value !== null) {
      let prefix = type ? "" : `${i} = `
      let part = ""
      if (Number(value)) {
        part = json[i]
      } else if (Array.isArray(value)) {
        part = `'${JSON.stringify(value)}'`
      } else if (typeof value === "object") {
        const { mode, value: set_value } = value
        if (mode === "concat") {
          part = `CONCAT(${i}, IF(${i} = '',"${set_value}",",${set_value}"))`
        } else if (mode === "trim") {
          part = `TRIM(BOTH ',' FROM replace(concat(',',${i},','), ',${set_value},', ''))`
        } else if (mode === "count") {
          part = `${i} ${set_value}`
        }
      } else {
        part = `'${json[i]}'`
      }
      results.push(`${prefix}${part}`)
    }
  }
  results = results.join(", ")
  return results
}

module.exports = handleUpdate
