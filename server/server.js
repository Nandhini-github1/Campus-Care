const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

// Grievance Schema
const grievanceSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    department: { type: String, required: true },
    complaintCategory: { type: String, required: true }, 
    complaintTitle: { type: String, required: true },
    complaintDescription: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    certificateUrl: { type: String },
    assignedDepartment: { type: String } // Admin assigned department
},
{ collection: "grievances" });

const Grievance = mongoose.model('Grievance', grievanceSchema);

// Student Schema
const studentSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentId: { type: String, required: true },
    department: { type: String, required: true }
});

const Student = mongoose.model('Students', studentSchema);

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.json());

// Session setup
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/grievanceSystem', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Grievance Creation route
app.post('/api/grievances', async (req, res) => {
    const { studentName, studentId, department, complaintCategory, complaintTitle, complaintDescription } = req.body;

    if (!studentName || !studentId || !department || !complaintCategory || !complaintTitle || !complaintDescription) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const grievance = new Grievance({
            studentName,
            studentId,
            department,
            complaintCategory,
            complaintTitle,
            complaintDescription,
        });

        await grievance.save();
        res.status(201).json(grievance);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Fetch all grievances (Admin view)
app.get('/api/grievances', async (req, res) => {
    try {
        const grievances = await Grievance.find({});
        res.json(grievances);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching grievances' });
    }
});



// Assuming you're using Express.js with a route for fetching a specific grievance
app.get('/api/grievances/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const grievance = await Grievance.findById(id); // Assuming you're using Mongoose
        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }
        res.json(grievance);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});





// Fetch student profile from session
app.get('/api/profile', async (req, res) => {
    if (!req.session.studentId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const student = await Student.findOne({ studentId: req.session.studentId });
        res.json({ username: student.username, studentId: student.studentId, department: student.department });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
});

// Fetch grievances by category for Hostel/Food dashboards
app.get('/api/grievances/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const grievances = await Grievance.find({ assignedDepartment: category });
        res.json(grievances);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching grievances by category', error });
    }
});

// Update grievance status (Admin only)
app.put('/api/grievances/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedGrievance = await Grievance.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedGrievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }
        res.json(updatedGrievance);
    } catch (error) {
        res.status(500).json({ message: 'Error updating grievance status' });
    }
});

// Update grievance department (Admin assigns department)
app.put('/api/grievances/:id/assign', async (req, res) => {
    const { id } = req.params;
    const { assignedDepartment } = req.body;
    try {
        const updatedGrievance = await Grievance.findByIdAndUpdate(id, { assignedDepartment }, { new: true });

        if (!updatedGrievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }
        res.json(updatedGrievance);
    } catch (error) {
        res.status(500).json({ message: 'Error assigning department' });
    }
});


// Fetch grievances by category for College, Counseling, Certificate dashboards
app.get('/api/grievances/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const grievances = await Grievance.find({ complaintCategory: category });
        res.json(grievances);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching grievances by category', error });
    }
});

// User Registration Route
app.post('/api/register', async (req, res) => {
    const { username, password, studentId, department } = req.body;

    if (!username || !password || !studentId || !department) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await Student.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Student({
            username,
            password: hashedPassword,
            studentId,
            department,
        });

        await newUser.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Student Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await Student.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Store the student ID in the session
        req.session.studentId = user.studentId;
        req.session.username = user.username;

        res.json({ message: 'Login successful', user: { username: user.username, studentId: user.studentId } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Fetch student profile from session
app.get('/api/profile', (req, res) => {
    if (req.session.studentId) {
        res.json({ user: { studentId: req.session.studentId, username: req.session.username } });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Logout Route
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
});



// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});