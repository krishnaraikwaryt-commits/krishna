const express = require("express");
const axios = require("axios"); 
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SHEETDB_URL = "https://sheetdb.io/api/v1/7skn6892hya7x"; 

app.post("/api/leads", async (req, res) => {
    try {
        const leadData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            time: new Date().toLocaleString()
        };

        // Ye line data ko Google Sheet mein bhejegi
        await axios.post(SHEETDB_URL, { data: leadData });

        console.log("✅ GOOGLE SHEET MEIN SAVE HO GAYA:", leadData.name);
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        console.error("❌ ERROR:", error.message);
        res.status(500).json({ error: "Failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});