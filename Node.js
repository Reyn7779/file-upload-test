const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

app.use(express.json());
app.use(fileUpload());

// Endpoint to get the file list
app.get('/get-file-list', (req, res) => {
    // Replace this with your actual file list logic
    const fileList = [
        { name: 'file1.txt', size: 1024, isDirectory: false, modified: '2023-01-01' },
        // Add more file/folder entries as needed
    ];
    res.json(fileList);
});

// Endpoint to upload a file
app.post('/upload', (req, res) => {
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
    }

    // Handle the uploaded file (replace this with your logic)
    const uploadedFile = req.files.file;
    console.log('File uploaded:', uploadedFile.name);

    res.json({ message: 'File uploaded successfully' });
});

// Endpoint to create a folder
app.post('/create-folder', (req, res) => {
    const folderName = req.body.name;

    // Handle the folder creation (replace this with your logic)
    console.log('Folder created:', folderName);

    res.json({ message: 'Folder created successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
