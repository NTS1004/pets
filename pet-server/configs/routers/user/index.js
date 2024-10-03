const router = require("koa-router")
const routers = new router()

// 登录
routers.get("login", async (ctx) => {
  const { code } = ctx.query
  try {
    const { openid } = await ctx.WX.getAuthLogin(code)
    const select_user_sql = ctx.db.constSelectSql({
      form: "pets_user",
      where: { openid }
    })
    const info = await ctx.db.execute(select_user_sql, "all")
    if (!info.id) {
      info.name = "某宠物的主人"
      const insert_user_sql = ctx.db.constCreateSql("pets_user", {
        openid,
        name: "某宠物的主人",
        create_time: ctx.moment()
      })
      await ctx.db.execute(insert_user_sql)
    }
    ctx.body = ctx.echo("success", "", {
      data: {
        openid,
        info
      }
    })
  } catch (err) {
    console.log(err)
    ctx.body = ctx.echo("error", err)
  }
})

// 修改信息
routers.put("setInfo", async (ctx) => {
  try {
    const {
      request: {
        body: { openid, ...res }
      }
    } = ctx
    const update_user_sql = ctx.db.constUpdateSql("pets_user", res, { openid })
    await ctx.db.execute(update_user_sql)
    ctx.body = ctx.echo("success", "保存成功")
  } catch (err) {
    console.log("err", err)
    ctx.body = ctx.echo("error", err)
  }
})

module.exports = routers.routes()
