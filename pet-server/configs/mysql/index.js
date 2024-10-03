const mysql = require("./_utils/mysql")
const config = require("../index")

const db = new mysql({
  host: config.db_host,
  port: config.db_port,
  user: config.db_user,
  password: config.db_pass,
  database: config.db_database
})

module.exports = db
