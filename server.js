const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Temporary storage (Server restart hone par data chala jayega)
let leadsData = [];

// Main Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Save Lead API
app.post("/api/leads", (req, res) => {
    const newLead = { 
        id: Date.now().toString(), 
        ...req.body,
        time: new Date().toLocaleString() 
    };
    leadsData.push(newLead);
    res.status(200).json({ message: "Success" });
});

// Get All Leads API
app.get('/leads', (req, res) => {
    res.json(leadsData);
});

// Delete Lead API
app.delete('/leads/:id', (req, res) => {
    const { id } = req.params;
    leadsData = leadsData.filter(lead => lead.id !== id);
    res.status(200).json({ message: "Deleted" });
});

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});