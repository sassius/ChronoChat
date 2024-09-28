const express = require('express');
const { PythonShell } = require('python-shell');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send', (req, res) => {
    console.log('Received request:', req.body);
    const { number, message, scheduleTime } = req.body;
    if (!number || !message) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'Both number and message are required' });
    }

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: [number, message]
    };

    if (scheduleTime) {
        options.args.push(scheduleTime);
    }

    console.log('Calling Python script with options:', options);

    PythonShell.run('send_whatsapp.py', options, (err, results) => {
        if (err) {
            console.error('Error running Python script:', err);
            res.status(500).json({ message: `Error: ${err.message}` });
        } else {
            console.log('Python script results:', results);
            res.json({ message: scheduleTime ? 'Message scheduled successfully!' : 'Message sent successfully!' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});