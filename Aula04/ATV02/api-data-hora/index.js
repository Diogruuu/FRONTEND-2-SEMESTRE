const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/data-hora', (req, res) => {
    const agora = new Date();
    
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR');

    res.json({
        data: dataFormatada,
        hora: horaFormatada,
        timestamp: agora.toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
});