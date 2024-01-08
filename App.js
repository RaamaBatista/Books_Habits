

const express = require('express')
const bodyparser = require('body-parser')

const app = express()
const port = 3000

var table = []
var banco = []

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('cadastro')
    // res.render('tabela', { table });
    // res.render('index')
    // res.render('login')
})

app.post('/cadastro', (req, res) => {
    let nome = req.body.nome
    let nomeL = req.body.nomeL
    let DnomeL = req.body.DnomeL
    let dateObject = new Date(DnomeL);
    let date =
        `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()} ` +
        `${dateObject.getHours()}:${dateObject.getMinutes()}`;

    let optradio = req.body.optradio
    let item = { 'nome': nome, 'LivroNome': nomeL, 'DataAluguel': date, 'QtdDia': optradio }

    table.push(item)
    res.render('tabela', { data: table });
    // res.redirect('/')

    // res.send(`O nome do cliente é: ${nome}, o livro escolhido foi: ${nomeL}, A data do aluguel foi: ${date},A quantidade de livros alugada foi: ${optradio}`)
})

app.post('/cada', (req, res) => {
    let email = req.body.email
    let senha = req.body.pswd
    let item = { 'email': email, 'senha': senha }
    banco.push(item)
    res.render('login')

})
app.post('/login', (req, res) => {
    let email = req.body.email
    let senha = req.body.pswd

    if (banco.length > 0) {
        for (let j = 0; j < banco.length; j++) {
            if (banco[j].email == email) {
                if (banco[j].senha == senha) {
                    res.render('cadastro')
                } else {
                    res.send('Senha incorreta');
                }
            } else {
                res.send('Credenciais Incorretas');

            }
        }
    } else {
        res.send('Credenciais Incorretas');
    }

})
app.post('/editar', (req, res) => {
  res.send('helolo')
})


  
  app.listen(port, () => {
    console.log(` Server listening on ${port}`)
})


