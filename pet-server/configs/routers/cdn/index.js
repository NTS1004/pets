const fs = require("fs")
const router = require("koa-router")
const routers = new router()

// 读取图片
routers.get(":dir/:file_name", async (ctx) => {
  try {
    const {
      params: { dir, file_name }
    } = ctx
    const file = await fs.readFileSync(`./cdn/${dir}/${file_name}`)
    ctx.body = file
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", "读取失败")
  }
})

module.exports = routers.routes()
