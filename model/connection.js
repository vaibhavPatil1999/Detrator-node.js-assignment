const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:process.env.DB_PASSWORD,
    database:'test_db'
})
const query = "create table posts (id int AUTO_INCREMENT , user_id int , filename varchar(255) , PRIMARY_KEY(id))"

module.exports = connection