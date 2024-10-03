const router = require("koa-router")
const routers = new router()

routers.get("swiper", async (ctx) => {
  try {
    const select_sql = ctx.db.constSelectSql({
      form: "pets_swiper"
    })
    const data = await ctx.db.execute(select_sql)

    ctx.body = ctx.echo("success", "", {
      data
    })
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", "获取轮播图失败")
  }
})

routers.get("cate", async (ctx) => {
  try {
    const select_sql = ctx.db.constSelectSql({
      form: "pets_cate"
    })
    const data = await ctx.db.execute(select_sql)

    ctx.body = ctx.echo("success", "", {
      data
    })
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", "获取分类失败")
  }
})

routers.get("recommend", async (ctx) => {
  const { page = 0 } = ctx.query
  try {
    const select_sql = ctx.db.constSelectSql({
      form: "pets_recommend",
      limit: [page * 5, 5]
    })
    const data = await ctx.db.execute(select_sql)

    ctx.body = ctx.echo("success", "", {
      data
    })
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", "获取推荐列表失败")
  }
})

module.exports = routers.routes()
