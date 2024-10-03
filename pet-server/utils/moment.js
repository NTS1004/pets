const moment = require("moment")

const Moment = (props = {}) => {
    let { date, add = [0, "day"], startOf, endOf, format = "YYYY-MM-DD HH:mm:ss" } = props
    if (typeof add === "number") {
        add = [add, "day"]
    }
    return moment(date).add(add[0], add[1]).startOf(startOf).endOf(endOf).format(format)
}

module.exports = Moment