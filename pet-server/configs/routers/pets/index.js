const router = require("koa-router")
const routers = new router()

routers.get("list", async (ctx) => {
  const { cate_id, page } = ctx.query
  try {
    const select_sql = ctx.db.constSelectSql({
      form: "pets_list",
      where: { cate_id },
      limit: [page * 6, 6]
    })
    const data = await ctx.db.execute(select_sql)
    for (let i = 0; i < data.length; i++) {
      data[i].images = data[i].images.split(",")
    }
    ctx.body = ctx.echo("success", "", {
      data
    })
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", "获取宠物列表失败")
  }
})

routers.get("details/:id", async (ctx) => {
  try {
    const { params } = ctx
    const select_sql = ctx.db.constSelectSql({
      form: "pets_list",
      where: params
    })
    const data = await ctx.db.execute(select_sql, "all")

    ctx.body = ctx.echo("success", "", {
      data
    })
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", "获取宠物详情失败")
  }
})

module.exports = routers.routes()
