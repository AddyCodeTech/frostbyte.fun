const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Post Schema
const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// API Routes
app.get('/api/posts', async(req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/posts', async(req, res) => {
    try {
        const post = new Post({ content: req.body.content });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: 'Bad request' });
    }
});

// Serve static files
app.use(express.static('../public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));