const handleWhere = (condition) => {
  let len = Object.keys(condition).length
  let index = 0
  let condition_str = []
  for (let i in condition) {
    index += 1
    let part = ""
    let suffix = ""
    if (typeof condition[i] === "object") {
      const { mode = "equal", value, value_type = "", value_even = "OR", even = "AND" } = condition[i]
      if (mode.includes("equal")) {
        if (Array.isArray(value)) {
          let value_part = []
          value.forEach((item) => {
            let h_value = isNaN(Number(item)) || value_type === "string" ? `'${item}'` : item
            value_part.push(`${i} ${mode === "equal" ? "=" : "!="} ${h_value}`)
          })
          part = value_part.join(` ${value_even} `)
        } else {
          let h_value = isNaN(Number(value)) || value_type === "string" ? `'${value}'` : value
          part = `${i} ${mode === "equal" ? "=" : "!="} ${h_value}`
        }
      } else if (mode === "like") {
        part = `${i} LIKE '%${value}%'`
      } else if (mode === "between") {
        part = `${i} BETWEEN '${value.start_time}' ${value.even || "AND"} '${value.end_time}'`
      } else if (mode === "find_in_set") {
        part = `FIND_IN_SET(${value}, ${i})`
      } else if (mode === "custom") {
        part = value
      }
      suffix = len === index ? "" : ` ${even} `
    } else {
      let h_value = isNaN(Number(condition[i])) && !condition[i].includes(".") ? `'${condition[i]}'` : condition[i]
      part = `${i} = ${h_value}`
      suffix = len === index ? "" : ` AND `
    }
    condition_str.push(`${part}${suffix}`)
  }
  condition_str = condition_str.join("")
  return condition_str
}

module.exports = handleWhere
