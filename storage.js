// Function to save selected files to localStorage
function saveSelectedFilesToStorage() {
    const selectedFiles = Array.from(fileInput.files).map(file => file.name);
    localStorage.setItem('selectedFiles', JSON.stringify(selectedFiles));
}

// Function to load selected files from localStorage
function loadSelectedFilesFromStorage() {
    const storedFiles = localStorage.getItem('selectedFiles');
    if (storedFiles) {
        const files = JSON.parse(storedFiles);
        // Set the selected files in the file input
        fileInput.files = files.map(fileName => new File([], fileName));
        // Update the file display
        updateFileDisplay();
    }
}

// Call loadSelectedFilesFromStorage on page load
loadSelectedFilesFromStorage();

// ...

// Update the file display with icons and sizes
updateFileList();

// ...

// Function to update the file display
function updateFileDisplay() {
    // Save the selected files to localStorage
    saveSelectedFilesToStorage();

    // The rest of your existing code...
}

// ...

// Function to reset the file display and clear localStorage
function resetFileDisplay() {
    localStorage.removeItem('selectedFiles');
    fileInput.value = ''; // Clear the selected files
    updateFileDisplay();
}

// Use resetFileDisplay instead of updateFileDisplay in delete and rename functions
function renameFile() {
    const selectedFile = fileDisplay.textContent.replace('Selected File/Folder: ', '');
    if (selectedFile) {
        const newFileName = prompt(`Rename ${selectedFile} to:`);
        if (newFileName !== null) {
            if (newFileName !== '') {
                alert(`File renamed: ${selectedFile} to ${newFileName}`);
                resetFileDisplay();
            } else {
                alert('Invalid file name. Please enter a valid name.');
            }
        }
    } else {
        alert('No file selected.');
    }
}

function deleteFile() {
    const selectedFile = fileDisplay.textContent.replace('Selected File/Folder: ', '');
    if (selectedFile) {
        if (confirm(`Are you sure you want to delete ${selectedFile}?`)) {
            alert(`File deleted: ${selectedFile}`);
            resetFileDisplay();
        }
    } else {
        alert('No file selected.');
    }
}
