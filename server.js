const express = require('express');
const app = express();
const https = require('https'); 
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname));

// Tumhara Google Script Link (Maine link wahi rakha hai jo tune pehle bataya tha)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyR668A7K-0V5I8I-0V5I8I-0V5I8I/exec"; 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Sheet mein data bhejne ke liye bina axios ke code
app.post("/api/leads", (req, res) => {
    const data = JSON.stringify(req.body);
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' } };

    const request = https.request(SCRIPT_URL, options, (response) => {
        response.on('data', () => { res.status(200).json({ message: "Success" }); });
    });

    request.on('error', (err) => { res.status(500).json({ error: "Sheet error" }); });
    request.write(data);
    request.end();
});

// Sheet se data lene ke liye bina axios ke code
app.get('/leads', (req, res) => {
    https.get(SCRIPT_URL, (response) => {
        let body = '';
        response.on('data', (chunk) => { body += chunk; });
        response.on('end', () => { res.json(JSON.parse(body)); });
    }).on('error', (err) => { res.json([]); });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CRM Live on port ${PORT}`));