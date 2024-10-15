const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('whatsapp-web.js');
const { getClients, notifyClients } = require('./db');

const app = express();
app.use(bodyParser.json());

const client = new Client();

client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
});

client.initialize();

app.get('/api/clients', async (req, res) => {
    const clients = await getClients();
    res.json(clients);
});

// Rota para notificar clientes
app.post('/notify', async (req, res) => {
    const clients = await notifyClients();
    res.json(clients);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
