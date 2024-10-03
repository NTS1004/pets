const handleForm = (form, field, as) => {
  let SELECT = ""
  if (typeof form === "string") {
    SELECT = `SELECT ${as ? `${as}.` : ""}${field} FROM ${form}${as ? ` ${as}` : ""}`
  } else {
    let part_form = []
    let part_field = []
    for (let i = 0; i < form.length; i++) {
      const item = form[i]
      let { form: item_form, field: item_field, as: item_as, on, even = "LEFT JOIN" } = item
      if (item_field) {
        let split_item_field = item_field.split(", ")
        item_field = split_item_field
          .map((item) => {
            let h_item = item
            if (item.includes("(")) {
              let split_item = item.split("(")
              split_item[1] = `distinct ${item_as}.${split_item[1]}`
              h_item = split_item.join("(")
            } else {
              h_item = `${item_as}.${item}`
            }
            return h_item
          })
          .join(", ")
      } else {
        item_field = `${item_as}.*`
      }
      let ON = on ? ` ON ${on}` : ""
      let EVEN = i !== form.length - 1 ? ` ${even} ` : ""
      part_form.push(`${item_form} ${item_as}${ON}${EVEN}`)
      part_field.push(`${item_field}`)
    }
    SELECT = `SELECT ${part_field.join(", ")} FROM ${part_form.join("")}`
  }
  return SELECT
}

module.exports = handleForm
