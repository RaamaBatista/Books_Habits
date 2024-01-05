
const express = require('express')
const bodyparser = require('body-parser')

const app = express()
const port = 3000

app.set('views','./views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.get('/', (req, res) =>{
    res.render('form')
    // res.render('index')
})

app.post('/cadastro',(req,res)=>{
    let nome = req.body.nome
    let nomeL = req.body.nomeL
    let DnomeL = req.body.DnomeL
    let dateObject = new Date(DnomeL);
    let date =
        `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()} ` +
        `${dateObject.getHours()}:${dateObject.getMinutes()}`;

    let optradio = req.body.optradio
    res.send(`O nome do cliente é: ${nome}, o livro escolhido foi: ${nomeL}, A data do aluguel foi: ${date},A quantidade de livros alugada foi: ${optradio}`)
   
    
})

app.listen(port,()=>{
    console.log(` Server listening on ${port}`)
})


