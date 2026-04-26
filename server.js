const express = require('express');
const path = require('path');
const compression = require('compression'); // Speed ke liye
const app = express();

// Render ka port handle karne ke liye
const PORT = process.env.PORT || 3000;

// Performance improve karne ke liye compression use karein
app.use(compression());

// Static files (CSS, JS, Images) serve karne ke liye
// Isse Render ko folders dhundne mein aasani hoti hai
app.use(express.static(path.join(__dirname, '/')));

// Sabhi requests ko index.html par redirect karein (Single Page App ke liye)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling (Taaki server crash na ho)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke on the server!');
});

app.listen(PORT, () => {
    console.log(`🚀 Nexus CRM is live on port ${PORT}`);
});