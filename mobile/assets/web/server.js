const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Serve existing static site files from project root
const staticRoot = path.join(__dirname);
app.use(express.static(staticRoot));

// API: list project files with selected extensions
app.get('/api/files', async (req, res) => {
  try {
    const files = await fs.readdir(__dirname);
    const filtered = files
      .filter(f => ['.js', '.html', '.css'].includes(path.extname(f)))
      .map(f => ({ name: f }));
    res.json(filtered);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// API: return file content
app.get('/api/file', async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: 'missing name' });
  const filePath = path.join(__dirname, name);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.json({ name, content: data });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

// Serve built client (if present)
const clientDist = path.join(__dirname, 'client', 'dist');
if (fsSync.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
