const express = require('express');
const mysql = require('mysql')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyparser.json())

const connection = mysql.createConnection({
    host: 'localhost',
    post: '3306',
    user: 'teste',
    password: '123456',
    database: 'alunos'
})

connection.connect((err) => {
    if(err){
        console.log("Erro ao se conectar com a base de dados!" + err);
        return;
    }

    console.log("Conexão com a base de dados ok!")
})

app.get('/alunos', (req, res) => {
    connection.query(`SELECT * FROM alunos;`, (err, rows, fields) => {
        if(!err){
            res.send(rows);
            return;
        }else{
            console.log(err);
        }
    })
});

app.get('/alunos/:id', (req, res) => {
    const parametro = red.params.id;
    connection.query(`SELECT * FROM alunos WHERE id = ${parametro};`, (err, rows, fields) => {
        if(!err){
            res.send(rows);
            return;
        }else{
            console.log(err);
        }
    })
});

app.delete('/alunos/:id', (req, res) => {
    const parametro = req.params.id;
    connection.query(`DELETE FROM alunos WHERE id = ${parametro};`, (err, rows, fields) => {
        if(!err){
            res.send('Aluno deletado!');
            return;
        }else{
            console.log(err);
        }
    })
});

app.post('/alunos', (req, res) => {
    const aluno = req.body;
    connection.query(`INSERT INTO alunos(nome, idade, turma, sexo) VALUES('${aluno.nome}', ${aluno.idade}, '${aluno.turma}', '${aluno.sexo}');`, (err, rows, fields) => {
        if(!err){
            res.send('Aluno cadastrado!');
            return;
        }else{
            console.log(err);
        }

    })
});

app.put('/alunos', (req, res) => {
    const aluno = req.body;
    connection.query(`UPDATE alunos SET turma = '${aluno.turma} WHERE id = ${aluno.id}');`, (err, rows, fields) => {
        if(!err){
            res.send('Turma atualizada!');
            return;
        }else{
            console.log(err);
        }

    })
});

app.listen(3000, () => {
    console.log("Servidor está rodando na porta 3000!")
});