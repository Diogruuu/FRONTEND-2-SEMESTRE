const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let notas = [
    { id: 1, titulo: 'Primeira Nota', conteudo: 'Conteúdo da nota criada no servidor.' }
];

app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Notas da ATV02 rodando com sucesso!' });
});

app.get('/notas', (req, res) => {
    res.json(notas);
});

app.post('/notas', (req, res) => {
    const { titulo, conteudo } = req.body;

    if (!titulo || !conteudo) {
        return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios.' });
    }

    const novaNota = {
        id: notas.length > 0 ? notas[notas.length - 1].id + 1 : 1,
        titulo,
        conteudo
    };

    notas.push(novaNota);
    res.status(201).json(novaNota);
});

app.put('/notas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, conteudo } = req.body;

    const nota = notas.find(n => n.id === id);
    if (!nota) {
        return res.status(404).json({ erro: 'Nota não encontrada.' });
    }

    if (titulo) nota.titulo = titulo;
    if (conteudo) nota.conteudo = conteudo;

    res.json(nota);
});

app.delete('/notas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = notas.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Nota não encontrada.' });
    }

    const notaRemovida = notas.splice(index, 1);
    res.json({ mensagem: 'Nota excluída com sucesso!', nota: notaRemovida[0] });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});