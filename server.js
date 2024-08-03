const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.get('/api/user', (req, res) => {
    // Fetch user data from your database here
    const user = { name: 'John Doe' };
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
