import mysql from "mysql2/promise";

const dbConfig = {
  //host: "omnitools.cluster-cnc10a6gbp2t.us-east-2.rds.amazonaws.com",
  host: "db4free.net",
  port: "3306",
  user: "admin_watch1909",
  password: "W@terfall_1909",
  database: "watchtoday",
  connectionLimit: 10,
  queueLimit: 0,
};

export async function connectionRdsMySql() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}
