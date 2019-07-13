const {Client} = require('pg')

const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "wayfarer"
});
    
client.connect()
.then(() => console.log("Connected successfuly"))
.then(() => client.query("insert into test values ($1, $2, $3)",[1001, 'John', 'Emeka']))
.then(() => client.query("select * from test"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())