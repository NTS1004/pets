const fs = require("fs")
const router = require("koa-router")
const routers = new router()
const form = "pets_collection"

routers.get("list", async (ctx) => {
  const { openid } = ctx.header
  const { page } = ctx.query
  try {
    const select_sql = ctx.db.constSelectSql({
      form: [
        { form, field: "id", as: "A" },
        { form: "pets_list", field: "id pet_id, pet_name, images", as: "B", on: "A.pet_id = B.id" }
      ],
      orderBy: ["a.id", "DESC"],
      groupBy: "a.id",
      where: { "a.openid": openid, "a.status": 1 },
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
    ctx.body = ctx.echo("error", "获取宠物详情失败")
  }
})

routers.get("isExist", async (ctx) => {
  const { openid } = ctx.header
  try {
    const select_sql = ctx.db.constSelectSql({ form, where: Object.assign({ openid, status: 1 }, ctx.query) })
    const data = await ctx.db.execute(select_sql)
    ctx.body = ctx.echo("success", "", {
      data: data.length ? "1" : "0"
    })
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", "获取宠物详情失败")
  }
})

routers.post("add", async (ctx) => {
  const { openid } = ctx.header
  const { body } = ctx.request
  try {
    const select_sql = ctx.db.constSelectSql({ form, where: Object.assign({ openid }, body) })
    const data = await ctx.db.execute(select_sql)
    if (!data.length) {
      const insert_sql = ctx.db.constCreateSql(form, Object.assign({ openid, status: 1 }, body))
      await ctx.db.execute(insert_sql)
    } else {
      const update_sql = ctx.db.constUpdateSql(form, { status: 1 }, { openid, ...body })
      await ctx.db.execute(update_sql)
    }
    ctx.body = ctx.echo("success", "收藏成功")
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", "获取宠物详情失败")
  }
})

routers.put("cancel", async (ctx) => {
  const { openid } = ctx.header
  const { body } = ctx.request
  try {
    const update_sql = ctx.db.constUpdateSql(form, { status: 0 }, { openid, ...body })
    await ctx.db.execute(update_sql)
    ctx.body = ctx.echo("success", "取消成功")
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", "获取宠物详情失败")
  }
})

module.exports = routers.routes()
