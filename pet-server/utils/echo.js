const _ = require("lodash")

module.exports = function echo(status, message, data = {}) {
  return _.pickBy({
    ...Object.assign({}, { status, message }, data)
  })
}
