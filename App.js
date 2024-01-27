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

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('login');
})

app.get('/index', async (req, res) => {


    res.render('index')
})

app.get('/tabela', async (req, res) => {
    res.render('tabela', { data: await CadastroBooks.findAll() });
});

app.get('/user', async (req, res) => {
    res.render('user', { banco: await LoginUser.findAll() });
});

app.get('/cadastro', async (req, res) => {
    res.render('cadastro', { data: await LoginUser.findAll() });
});

app.get('/cadastro_livros', async (req, res) => {
    let id = req.query.id;

    const User = await LoginUser.findByPk(id)

    // res.render('cadastro_livro', {data: {id,nome}});
    res.render('cadastro_livro', { data: User });
});
app.get('/editar', async (req, res) => {
    const books = await AluguelBooks.findAll();
    console.log(books)
    res.render('editar', { data: { books: books } });
})


app.post('/cadastro', async (req, res) => {
    let idlogado = req.body.aqui
    const User = await Person.findByPk(idlogado)
    let nomelogado = req.body.nome
    nomelogado = User.nome
    let nomeL = req.body.nomeL
    let DnomeL = req.body.DnomeL
    let dateObject = new Date(DnomeL);
    let date =
        `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()} ` +
        `${dateObject.getHours()}:${dateObject.getMinutes()}`;

    let optradio = req.body.optradio
    const novoBook = await CadastroBooks.create({
        nome: nomelogado,
        LivroNome: nomeL,
        DataAluguel: dateObject,
        QtdDia: optradio,


    })
    res.render('tabela', { data: await CadastroBooks.findAll() });

})


app.post('/cadastro_livros', async (req, res) => {
    let id = req.body.idlogado
    console.log('idlogado', id);
    let nome = req.body.nomelogado

    const Userr = await Person.findByPk(id)
    nome = Userr.nome

    let nomeL = req.body.nomeL
    let vlr = req.body.vlr
    let imagemUrl = req.body.imagemUrl
    const User = await LoginUser.findByPk(id);
    console.log("Livro:", nomeL, " ", "Valor:", vlr)
    const novoBookCad = await AluguelBooks.create({
        nome: nomeL,
        valor: vlr,
        imagemUrl: imagemUrl
    })

    const books = await AluguelBooks.findAll();

    // res.render('cadastro_livro', {data: {id,nome}})
    res.render('index', { data: { "user": User, "books": books, 'userr': Userr } })
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
        senha: senha,
        idPerson: novoPerson.id
    })


    // res.redirect(`/index/${novoPerson.id}`);

    res.render('login');

})
app.post('/antIndex', async (req, res) => {
    let id = req.body.idlogado
    const User = await Person.findByPk(id)
    let nome = req.body.nomelogado
    // nome = User.nome
    console.log(nome)
    const books = await AluguelBooks.findAll();

    res.render('cadastro_livro', { data: { "user": User, "books": books } })
})
app.post('/index', async (req, res) => {
    let id = req.body.idlogado
    var aqui = id
    console.log(aqui)
    const User = await Person.findByPk(id)
    let nome = req.body.nomelogado
    nome = User.nome
    console.log(nome)
    const books = await AluguelBooks.findAll();

    res.render('cadastro', { data: { "user": User, "books": books , 'aqui': aqui} })
})

app.post('/login', async (req, res) => {
    let email = req.body.email
    let senha = req.body.pswd
    try {
        const User = await LoginUser.findOne({ where: { email: email, senha: senha }, include: Person })
        if (User === null) {
            res.send('Usuário não encontrado!')

        } else if (User === null) {
            res.send('Senha incorreta!')
        }
        const books = await AluguelBooks.findAll();
        res.render('index', { data: { "user": User, "books": books } })

    }
    catch (error) {
        res.send(error)

    }

})

app.get('/user', async (req, res) => {

    res.render('user');
});

app.post('/user', async (req, res) => {
    let id = req.body.idlogado
    
    const user = await LoginUser.findByPk(id);

    res.render('user', { banco: user });
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
        res.render('user', { banco: await LoginUser.findByPk(id) });
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
conexao.sync();


app.listen(port, () => {
    console.log(` Server listening on ${port}`)
})