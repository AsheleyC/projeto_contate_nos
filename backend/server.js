const express = require('express')
const server = express()
const cors = require('cors')
const mysql = require('mysql2/promise')
const porta = 3000
const conexao = require('./db')

server.use(express.json())
server.use(cors())

server.listen(porta, () => {
    console.log(`Servidor rodando em: http://localhost:${porta}`)
})


server.post('/contate', async (req, res) => {
    try {
        const { nome, email, telefone, assunto, mensagem } = req.body

        if (email.length < 10) {
            return res.json({ "resposta": "E-mail inválido" })
        } else if (nome.length < 3) {
            return res.json({ "resposta": "Nome inválido" })
        } else if (assunto.length == 0) {
            return res.json({ "resposta": "Adicione um assunto" })
        } else if (mensagem.length == 0) {
            return res.json({ "resposta": "Adicione uma mensagem" })
        } else if (!email.includes('@')) { // includes verifica se algo existe dentro de uma string
            return res.json({ "resposta": "E-mail inválido" })
        } else if (!email.includes('.')) {  // includes verifica se algo existe dentro de uma string
            return res.json({ "resposta": "E-mail inválido" })
        } else if (email.includes(' ') == true) {  // includes verifica se algo existe dentro de uma string
            return res.json({ "resposta": "E-mail inválido" })
        }

        const sql = `insert into contatos(nome, email, telefone, assunto, mensagem) values (?,?,?,?,?)`
        const [resposta] = await conexao.query(sql, [nome, email, telefone, assunto, mensagem])

        res.json({
            "resposta": "Sucesso"
        })


    } catch (error) {
        console.log(error)

        return res.json({ "resposta": "Erro inesperado. Tente novamente mais tarde." })
    }
})