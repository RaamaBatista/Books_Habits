// Falta formatar a data para conseguir autoincrementar 
const express = require('express')
const bodyparser = require('body-parser')
const conexao = require('./db');
const LoginUser = require('./models/loginUser');
const CadastroBooks = require('./models/cadastroBooks');
const Person = require('./models/person')
const AluguelBooks = require('./models/aluguelBooks')

const app = express()
const port = 3000

var data = []

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('login');
})
app.get('/index', (req, res) => {
    res.render('index');
})
app.get('/tabela', async (req, res) => {
    res.render('tabela', { data: await CadastroBooks.findAll() });
});

app.get('/user', async (req, res) => {
    res.render('user', { banco: await LoginUser.findAll() });
});

app.get('/cadastro',async (req, res) => {
    res.render('cadastro',  { data: await LoginUser.findAll()  });
});


app.post('/cadastro', async (req, res) => {
    let nome = req.body.nome
    let nomeL = req.body.nomeL
    let DnomeL = req.body.DnomeL
    let dateObject = new Date(DnomeL);
    let date =
        `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()} ` +
        `${dateObject.getHours()}:${dateObject.getMinutes()}`;

    let optradio = req.body.optradio
    const novoBook = await CadastroBooks.create({
        nome: nome,
        LivroNome: nomeL,
        DataAluguel: date,
        QtdDia: optradio,
        

    })
    console.log(novoBook)
    // let item = { 'nome': nome, 'LivroNome': nomeL, 'DataAluguel': date, 'QtdDia': optradio, 'dataa': DnomeL }
    res.render('tabela', { data: await CadastroBooks.findAll() });

})

app.post('/cada', async (req, res) => {
    let email = req.body.email
    let senha = req.body.pswd
    let nome = req.body.nome
    let endereco = req.body.endereco

    const novoPerson = await Person.create({
        nome: nome,
        endereco: endereco
    })
   const novaPerson = await LoginUser.create({
        email: email,
        senha: senha
   })

    console.log(novoPerson)
    console.log(novaPerson)
    // res.redirect(`/index/${novoPerson.id}`);

    res.render('login')

})
app.post('/index', async (req, res) => {
    res.render('cadastro', { data: await LoginUser.findAll()  });

})


app.post('/login', async (req, res) => {
    let email = req.body.email
    let senha = req.body.pswd
    
  
    try {
        const User = await LoginUser.findOne({ where: { email: email , senha: senha} })
        if (User === null) {
            res.send('Usuário não encontrado!')

        } else if (User === null) {
            res.send('Senha incorreta!')
        }

        res.render('index')

    }
    catch (error) {
        res.send(error)
        return 
    }

})

app.get('/user', async (req, res) => {
    res.render('user', { banco: await LoginUser.findAll() });
});
app.post('/editaruser', async (req, res) => {
    let email = req.body.emailuser
    let senha = req.body.senhauser
    let id = req.body.iduser

    const EditUser = await LoginUser.findByPk(id)

    if (EditUser != null) {
        EditUser.email = email
        EditUser.senha = senha
        EditUser.save()
        res.render('user', { banco: await LoginUser.findAll() });
    }

})

app.post('/deleteuser', async (req, res) => {
    let id = req.body.idd;

    const DeleteUser = await LoginUser.findByPk(id)

    if (DeleteUser != null) {
        DeleteUser.destroy()
        res.render('login');
    } else {
        res.send('Usuário Não Encontrado!')
    }

})
app.post('/editar', async (req, res) => {
    let id = req.body.id
    let name = req.body.recepNome
    let livro = req.body.recepLivro
    let data = req.body.recepDateL
    let dias = req.body.recepDate


    let dateObject = new Date(data);
    let date =
        `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()} ` +
        `${dateObject.getHours()}:${dateObject.getMinutes()}`;

    const EditBook = await CadastroBooks.findByPk(id)

    if (EditBook != null) {
        EditBook.nome = name
        EditBook.LivroNome = livro
        EditBook.DataAluguel = date
        EditBook.QtdDia = dias
        EditBook.save()
        res.render('tabela', { data: await CadastroBooks.findAll() });
    }
})

app.post('/deletar', async (req, res) => {
    let id = req.body.idd;

    const DeleteBook = await CadastroBooks.findByPk(id)

    if (DeleteBook != null) {
        DeleteBook.destroy()
        res.render('tabela', { data: await CadastroBooks.findAll() });
    } else {
        res.send('Livro Não Encontrado!')
    }


});
conexao.sync({force: true});
// const person = await Person.create({
//     nome: 'comput',
//     endereco: '10.50',
// })

// const user = await LoginUser.create({
//     email: 'raama@gmail.com',
//     senha: '123',
//     idPerson: pedido.id
// })
// const cadastro = CadastroBooks.create({
//     nome: 'Raama',
//     LivroNome: 'tgetsando',
//     DataAluguel: '0000-00-00 00:00:00',
//     QtdDia: 'Até 3 dias',
//     idUser = user.id

// })
// const pedido = await AluguelBooks.create({
//     produto: 'comput',
//     valor: 10.50,
//     idUser = user.id
// })
// console.log(pedido)


app.listen(port, () => {
    console.log(` Server listening on ${port}`)
})