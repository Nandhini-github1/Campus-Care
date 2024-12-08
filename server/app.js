const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/studentdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Student schema and model
const studentSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const Student = mongoose.model('Student', studentSchema);

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await Student.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new Student({ username, password });
    await newUser.save();
    res.json({ message: 'Registration successful' });
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Student.findOne({ username, password });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
