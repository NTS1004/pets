const koa = require("koa")
const http = require("http")
const router = require("koa-router")
const koaBody = require("koa-body")
const path = require("path")
require("module-alias/register")
const config = require("@/configs")
const db = require("@/configs/mysql")
const wx = require("@/configs/wx")
const Global = require("@/configs/global")
const echo = require("@/utils/echo")
const moment = require("@/utils/moment")

const app = new koa()

const WX = new wx({
  appid: "wx512ceee9f1bf9986",
  secret: "41b3bff570ffc68025b344cda4b71d9c"
})

// const WX = new wx({
//   appid: "wx4864881eef5a739a",
//   secret: "614c81154e54947d988ed50ce2e2b809"
// })

global = Object.assign(global, Global)

http.createServer(app.callback()).listen(config.port)

app.use(
  koaBody({
    multipart: true,
    formidable: {
      onFileBegin(_, file) {
        let { path } = file
        let split_path = path.split("/")
        let fileName = split_path[split_path.length - 1]
        file.visit_path = `${global.host}/cdn/${fileName}`
      },
      uploadDir: path.resolve("/upload"),
      keepExtensions: true
    }
  })
)

app.use(async (ctx, next) => {
  ctx.WX = WX
  ctx.db = db
  ctx.echo = echo
  ctx.moment = moment
  await next()
})

const routers = new router()
app.use(routers.routes())
routers.use("/", require("./configs/routers"))
