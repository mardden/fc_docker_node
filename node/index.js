const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)
connection.end()


app.get('/', (req,res) => {

    const connection = mysql.createConnection(config)
    const getUsersQuery = `SELECT id, name FROM people`;
    connection.query(getUsersQuery, (error, results, fields) => {
        if (error) {
            throw error
        };

        let list = '<ul>'
        for(let people of results) {
            list += `<li>${people.id} - ${people.name}</li>`
        }

        list += '</ul>'
        res.send('<h1>Full Cycle Rocks!</h1>' + list)
    });
    connection.end()

})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
