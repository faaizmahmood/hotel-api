const mysql=require('mysql')

const connection = mysql.createConnection({
    host: 'b71brmgshqybm1oaileq-mysql.services.clever-cloud.com',
    user: 'u2hamhtrtjaj7iix',
    password: 'pLhXqLuDZcNjPSHEwOtG',
    database: 'b71brmgshqybm1oaileq',
    port: '3306'
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('Database Conntcted')
})

module.exports = connection;