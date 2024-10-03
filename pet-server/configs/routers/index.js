const router = require("koa-router")
const routers = new router()

routers.use("config/", require("./config"))
routers.use("user/", require("./user"))
routers.use("cdn/", require("./cdn"))
routers.use("pets/", require("./pets"))
routers.use("collection/", require("./collection"))

module.exports = routers.routes()
