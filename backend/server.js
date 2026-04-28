const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// CORS allows your React frontend (usually on port 5173) to talk to this server
app.use(cors());
app.use(express.json());

const skillData = {
  nodes: [
    { id: "React", group: 1 }, { id: "D3.js", group: 1 },
    { id: "Express", group: 2 }, { id: "Node.js", group: 2 },
    { id: "Data Science", group: 3 }, { id: "Data Analytics", group: 3 }
  ],
  links: [
    { source: "React", target: "D3.js" },
    { source: "Express", target: "Node.js" },
    { source: "React", target: "Express" },
    { source: "D3.js", target: "Data Analytics" }
  ]
};

app.get('/api/skills', (req, res) => {
  res.json(skillData);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});