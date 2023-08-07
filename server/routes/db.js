const sql = require('mysql2');
const SQL_INJ_ERROR = "Potential sql injection"

// make a localhost user dfs_root with password dfsRoot*123, it will use dfs_root
// or change the connection params to your own , all including USER
const connectionParams = {
  host: "localhost",
  user: "dfs_root",
  database: "dfs_db",
  password:"dfsRoot*123"
}

const pool = process.env.USER === 'dfs_root' ?
  sql.createPool({ ...connectionParams, user: 'dfs_root' }) :
  sql.createPool({ ...connectionParams });


function execSql(statement) {
  return new Promise(function (res, rej) {
    if (statement.includes(';')) {
      console.log(statement);
      rej(SQL_INJ_ERROR);
    }
    pool.getConnection((err, con) => {
      if (err) 
      {
        console.log(err);
        rej(err);
      }

      console.log("Connected to database");
      console.log(statement);
      con.query(statement, function (err, result) {
        con.release();
        if (err) rej(err);
        else res(result);
      });


    })
  });
}

module.exports = {
  execSql,
  SQL_INJ_ERROR
}