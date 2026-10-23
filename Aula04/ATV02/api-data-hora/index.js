const express = require('express');
const cors = require('cors'); // <--- Importante

const app = express();
app.use(cors()); // <--- Libera o acesso para qualquer frontend (Vercel, local, etc.)

app.get('/data-hora', (req, res) => {
    const agora = new Date();
    res.json({
        data: agora.toLocaleDateString('pt-BR'),
        hora: agora.toLocaleTimeString('pt-BR')
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));