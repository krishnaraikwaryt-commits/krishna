const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Static files (CSS, JS, Images) ko serve karne ke liye
app.use(express.static(__dirname));

// Main Route: Ye direct index.html load karega
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Agar koi aur route par jaye toh bhi index.html dikhaye (SPA handling)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});