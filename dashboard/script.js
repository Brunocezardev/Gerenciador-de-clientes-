let clients = []; // Array para armazenar todos os clientes

async function fetchClients() {
    const response = await fetch('/api/clients');
    clients = await response.json();
    updateClientTables();
}

function updateClientTables() {
    const activeTableBody = document.querySelector('#activeClientTableBody');
    const expiredTableBody = document.querySelector('#expiredClientTableBody');
    
    activeTableBody.innerHTML = ''; // Limpa a tabela de ativos
    expiredTableBody.innerHTML = ''; // Limpa a tabela de expirados

    const today = new Date();
    
    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.phone}</td>
            <td>${client.dueDate}</td>
        `;
        
        const dueDate = new Date(client.dueDate);
        if (dueDate >= today) {
            activeTableBody.appendChild(row); // Adiciona à tabela de ativos
        } else {
            expiredTableBody.appendChild(row); // Adiciona à tabela de expirados
        }
    });
}

async function addClient(client) {
    const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
    });
    return response.json();
}

document.addEventListener('DOMContentLoaded', fetchClients);

document.getElementById('addClientForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const dueDate = document.getElementById('dueDate').value;

    const newClient = {
        name: clientName,
        phone: clientPhone,
        dueDate: dueDate
    };

    await addClient(newClient);
    document.getElementById('addClientForm').reset();
    fetchClients(); // Atualiza as tabelas
});
