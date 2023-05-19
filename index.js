//prima------
import express from 'express';
import fs from 'fs';
import path from 'path';
import url from 'url';
import cors from 'cors';

const app = express();
const PORT = 8080;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cors());
app.use( '/static', express.static(path.join(__dirname, 'public')),);



let mondo = [
{ 
    "nome":  "Regno di Spagna",
    "capitale": "Madrid",
    "lingua": "Spagnolo",
    "continente": "Europe",
    "homolegale": "true",
    "bandiera": "https://flagcdn.com/w320/es.png",
    "id": "0"
}]


//LETTURA FILE 
fs.open("public/data.json", "wx+", (err, f) => {
    if (err) {
        fs.readFile("public/data.json", (erro, data) => {
            if (erro) console.error(erro);
            else {
                console.log("Letto!");
                mondo = JSON.parse(data);
            }
        });
        return;
    }
        fs.writeFile("public/data.json", JSON.stringify(mondo), (err) => {
            if (err) console.error(err);
            else console.log("File FILM Salvato!")
        });
});

app.get('/', (req, res) => {
    res.send('Il server sta funzionando correttamente. \n Per visuallizzare tutti i dati basta andare al seguente ip: http://localhost:3000/Mondo')
})

app.get('/mondo', (req, res) => {

    const paesi = JSON.parse(JSON.stringify(mondo));
    res.json(paesi)
    console.log(paesi)

});

//MOSTRA SINGOLO PAESE GET CON homolegale
app.get('/mondo/:homolegale', (req, res) => {
    const homolegale = req.params.homolega;

})


//WEB API PER INSERIMENTO!
app.post('/mondo', (req,res)=>{
    //const film = req.body;
    const paese = JSON.parse(JSON.stringify(req.body));

    paese.id = mondo.length; //Aggiungo un id ai film, che si autoincrementa.
    mondo.push(paese);

    fs.writeFile('../ApiRest WorldHomo/data.json',JSON.stringify(mondo),(err) =>{ if(err)console.error(err)});

    res.send('Paese aggiunto al database!')

})



//MOSTRA SINGOLO PAESE GET CON ID
app.get('/mondo/:id', (req, res) => {
    const id = req.params.id;
    const object = res.json(mondo.find(obj => obj.id === id));
    console.log("------------------------- \n" + JSON.stringify(req.body));
    // res.status(404).send('Paese non trovato!');

})



app.listen(
    PORT,
    () => console.log("it'alive on http://localhost:8080")
)