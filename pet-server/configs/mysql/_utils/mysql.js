const mysql = require("mysql")
const _ = require("lodash")
const handleUpdate = require("./handler-update")
const handleForm = require("./handle-form")
const handleWhere = require("./handle-where")
const handleOrderBy = require("./handle-orderBy")

class Mysql {
  constructor(config) {
    this._config = config
    this._pool = null
    this._connection = null
    this.pingTi = null
    this.connect()
  }
  // 连接
  connect() {
    this._pool = mysql.createPool({
      ...this._config,
      multipleStatements: true,
      useConnectionPooling: true,
      connectionLimit: 100,
      waitForConnections: true
    })
    this._pool.on("error", (err) => {
      if (err) {
        this.connect()
      }
    })
    this.ping()
  }
  // 执行sql
  execute(sql, single = []) {
    return new Promise((resolve, reject) => {
      this._pool.getConnection(async (_, connection) => {
        this._connection = connection
        let res
        try {
          if (typeof sql == "string") {
            res = await this.promise_query(sql)
            if (single == "all") {
              res = res[0] || {}
            }
          } else {
            res = []
            let dataset = await this.promise_query(sql.join("; "))
            for (let i = 0; i < dataset.length; i++) {
              let data = dataset[i]
              if (single === "all" || single.includes(i)) {
                res.push(data[0])
              } else {
                res.push(data)
              }
            }
          }
          resolve(res)
        } catch (err) {
          reject(err)
        }
        this.release()
      })
    })
  }
  // 断开连接
  release() {
    if (this._connection) {
      this._connection.release()
      this._connection = null
    }
  }
  // ping 防止断开
  ping() {
    if (this.pingTi) clearInterval(this.pingTi)
    this.pingTi = setInterval(() => {
      this._pool.ping((err) => {
        if (err) {
          this.connect()
        }
      })
    }, 1000 * 60 * 60 * 7)
  }
  // 封装异步执行sql函数
  promise_query(sql) {
    return new Promise((resolve, reject) => {
      this._connection.query(sql, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
  // 构造单表查询的sql
  constSelectSql({ form, field = "*", as, where = {}, orderBy = [], limit, groupBy }) {
    where = _.pickBy(where)
    let SELECT = handleForm(form, field, as)
    let WHERE = Object.keys(where).length ? ` WHERE ${handleWhere(where)}` : ""
    let ORDERBY = handleOrderBy(orderBy[0], orderBy[1])
    let LIMIT = limit ? ` LIMIT ${Array.isArray(limit) ? limit.join(", ") : limit}` : ""
    let GROUPBY = groupBy ? ` GROUP BY ${groupBy}` : ""
    return `${SELECT}${WHERE}${GROUPBY}${ORDERBY}${LIMIT}`
  }
  // 构造创建的sql
  constCreateSql(form, data) {
    return `INSERT INTO ${form} (${Object.keys(data).join(", ")}) VALUES (${handleUpdate(data, 1)})`
  }
  // 构造修改的sql
  constUpdateSql(form, data, where) {
    return `UPDATE ${form} SET ${handleUpdate(data)} WHERE ${handleWhere(where)}`
  }
  // 构造删除的sql
  constDeleteSql(form, where) {
    return `DELETE FROM ${form} WHERE ${handleWhere(where)}`
  }
}

module.exports = Mysql
