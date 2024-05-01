const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});


async function query(sqlStatement) {
  console.log(sqlStatement);
  const result = await sql`${sqlStatement}`;
  return result;
}

async function close() {
  await sql.end();
}


module.exports = {
  sql,
  close,
};

getPgVersion();