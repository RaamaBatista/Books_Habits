
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
    res.render('login');  
})
app.get('/index', (req, res) => {
    res.render('index');  
})
app.get('/tabela', (req, res) => {
    res.render('tabela', { data: table });  
});

app.get('/user', (req, res) => {
    res.render('user', { banco: banco });  
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro');  
});
app.post('/cadastro', (req, res) => {
    let nome = req.body.nome
    let nomeL = req.body.nomeL
    let DnomeL = req.body.DnomeL
    let dateObject = new Date(DnomeL);
    let date =
        `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()} ` +
        `${dateObject.getHours()}:${dateObject.getMinutes()}`;

    let optradio = req.body.optradio
    let item = { 'nome': nome, 'LivroNome': nomeL, 'DataAluguel': date, 'QtdDia': optradio, 'dataa': DnomeL }

    table.push(item)
    res.render('tabela', { data: table });
    // res.redirect('/')

    // res.send(`O nome do cliente é: ${nome}, o livro escolhido foi: ${nomeL}, A data do aluguel foi: ${date},A quantidade de livros alugada foi: ${optradio}`)
})

app.post('/cada', (req, res) => {
    let email = req.body.email
    let senha = req.body.pswd
    let id = banco.length

    let item = { 'id': id, 'email': email, 'senha': senha }
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
                    res.render('index')
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
app.get('/user', (req, res) => {
    res.render('user', { banco: banco });
});
app.post('/editaruser', (req, res) => {
    let email = req.body.emailuser
    console.log(email)
    let senha = req.body.senhauser
    console.log(senha)
    let id =parseInt( req.body.iduser)
    console.log(banco)

    banco.forEach((item, index) => {
        if (item.id === id) {
          banco[index] = { ...item, email: email, senha: senha};
          console.log('Email modificado com sucesso:', banco[index]);
        }
      });
      
      console.log('Array Atualizado:', banco);


    res.render('user', { banco: banco });

})

app.post('/deleteuser', (req, res) => {
    let id = req.body.id;
    console.log(banco);

    if (id >= 0 && id < banco.length) {
        banco.splice(id, 1);
        console.log('Usuário removido com sucesso. Novo array:', banco);
        res.redirect('cadastro', { banco: banco });  //Não sei se está apagando ou nao

    }
    
})
app.post('/editar', (req, res) => {
    let id = req.body.id
    let name = req.body.recepNome
    let livro = req.body.recepLivro
    let data = req.body.recepDateL
    let dias = req.body.recepDate

    console.log("ID:", id);
    console.log("Nome:", name);
    console.log("Livro:", livro);
    console.log("Data:", data);
    console.log("Dias:", dias);
    let dateObject = new Date(data);
    let date =
        `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()} ` +
        `${dateObject.getHours()}:${dateObject.getMinutes()}`;


    table[id].nome = name
    table[id].LivroNome = livro
    table[id].DataAluguel = date
    table[id].QtdDia = dias

    res.render('tabela', { data: table });
})

app.post('/deletar', (req, res) => {
    let id = req.body.idd;
    console.log(table);

    if (id >= 0 && id < table.length) {
        table.splice(id, 1);
        res.render('tabela', { data: table });

    }
});



app.listen(port, () => {
    console.log(` Server listening on ${port}`)
})




