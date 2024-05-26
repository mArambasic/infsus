const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const path = require("path");

const app = express();

const PORT = 8081;
const HOST = 'localhost';
const API_BASE_URL ='http://localhost:8081';

app.use(
    "/api",
    createProxyMiddleware({
        target: API_BASE_URL,
        changeOrigin: true,
    })
);

app.use(express.static(path.join(__dirname, 'build')))

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

app.get("*", async (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    }
);
