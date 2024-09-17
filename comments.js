// Create web server and listen on port 3000
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Use body-parser to parse POST request body
app.use(bodyParser.json());

// Read comments from comments.json file
function readComments() {
    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    } catch (err) {
        console.error('Failed to read comments:', err);
    }
    return comments;
}

// Write comments to comments.json file
function writeComments(comments) {
    try {
        fs.writeFileSync('comments.json', JSON.stringify(comments, null, 4));
    } catch (err) {
        console.error('Failed to write comments:', err);
    }
}

// Get all comments
app.get('/comments', (req, res) => {
    res.json(readComments());
});

// Add a new comment
app.post('/comments', (req, res) => {
    const comments = readComments();
    const newComment = req.body;
    comments.push(newComment);
    writeComments(comments);
    res.json(newComment);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});