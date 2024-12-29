const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

let wasmModule = null;

async function loadWasm() {
    const wasmPath = path.join(__dirname, '..', 'wasm', 'sum.js');
    wasmModule = require(wasmPath);
    await wasmModule.ready;
}

app.get('/sum', async (req, res) => {
    const a = parseInt(req.query.a) || 0;
    const b = parseInt(req.query.b) || 0;
    
    if (!wasmModule) {
        return res.status(500).json({ error: 'WebAssembly not loaded' });
    }

    const result = wasmModule._sum(a, b);
    res.json({ result });
});

async function start() {
    try {
        await loadWasm();
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

start();
