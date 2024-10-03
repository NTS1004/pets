const handleOrderBy = (orderBy, sort = "ASC") => {
  let ORDERBY = ""
  if (orderBy) {
    let orderBy_value = ""
    let sort_value = sort
    if (Array.isArray(orderBy)) {
      orderBy_value = `${orderBy.JOIN(", ")}`
    } else if (typeof orderBy === "object") {
      const { mode, field, value, order = "ASC" } = orderBy
      sort_value = order ? ` ${order}` : ""
      if (mode === "field") {
        orderBy_value = `FIELD(${field}, ${value})`
      } else {
        orderBy_value = `${value}`
      }
    } else {
      orderBy_value = `${orderBy}`
    }
    ORDERBY = ` ORDER BY ${orderBy_value} ${sort_value}`
  }
  return ORDERBY
}

module.exports = handleOrderBy
