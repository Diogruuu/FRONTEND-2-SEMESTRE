const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Banco de dados em memória
let notas = [
    { id: 1, titulo: 'Minha primeira nota', conteudo: 'Estudando Express no SENAI' }
];

// Rota raiz para teste
app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Notas ativa!' });
});

// 1. READ (Listar todas as notas)
app.get('/notas', (req, res) => {
    res.json(notas);
});

// 2. READ (Buscar nota por ID)
app.get('/notas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nota = notas.find(n => n.id === id);

    if (!nota) {
        return res.status(404).json({ erro: 'Nota não encontrada.' });
    }

    res.json(nota);
});

// 3. CREATE (Criar nova nota)
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

// 4. UPDATE (Editar nota existente)
app.put('/notas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, conteudo } = req.body;

    const index = notas.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Nota não encontrada.' });
    }

    if (titulo) notas[index].titulo = titulo;
    if (conteudo) notas[index].conteudo = conteudo;

    res.json(notas[index]);
});

// 5. DELETE (Excluir nota)
app.delete('/notas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = notas.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Nota não encontrada.' });
    }

    const notaRemovida = notas.splice(index, 1);
    res.json({ mensagem: 'Nota removida com sucesso.', nota: notaRemovida[0] });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});