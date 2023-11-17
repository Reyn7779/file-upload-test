document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display file list
    displayFileList();

    function displayFileList() {
        const fileManagerDiv = document.getElementById("file-manager");

        // Fetch file list from the server (replace with actual endpoint)
        fetch("http://localhost:3000/get-file-list")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch file list: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Clear existing content
                fileManagerDiv.innerHTML = "";

                // Iterate through the file list and display each file/folder
                data.forEach(item => {
                    const listItem = document.createElement("div");
                    listItem.classList.add("file-item");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.name = "selectedFiles";
                    checkbox.value = item.name;

                    const icon = document.createElement("span");
                    icon.classList.add("file-icon");

                    // Set the icon based on file type
                    icon.textContent = item.isDirectory ? "📁" : getFileIcon(item.name);

                    const fileName = document.createElement("span");
                    fileName.textContent = item.name;

                    const fileSize = document.createElement("span");
                    fileSize.textContent = item.size ? ` (${formatBytes(item.size)})` : "";

                    listItem.appendChild(checkbox);
                    listItem.appendChild(icon);
                    listItem.appendChild(fileName);
                    listItem.appendChild(fileSize);

                    fileManagerDiv.appendChild(listItem);
                });
            })
            .catch(error => console.error("Error fetching file list:", error));
    }

    function getFileIcon(fileName) {
        const fileExtension = fileName.split('.').pop().toLowerCase();
        switch (fileExtension) {
            case 'pdf':
                return "📄"; // PDF icon
            case 'doc':
            case 'docx':
                return "📃"; // Word document icon
            // Add more cases for other file types as needed
            default:
                return "📂"; // Default file icon
        }
    }

    // Helper function to format bytes into a human-readable format
    function formatBytes(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    // File upload functionality
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.addEventListener("change", handleFileUpload);

    function handleFileUpload() {
        const file = fileInput.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        // Use fetch API to upload file to the server (replace with actual endpoint)
        fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Handle server response, e.g., update file list
                console.log(data);
                displayFileList();
            })
            .catch(error => console.error("Error uploading file:", error));
    }

    // Create folder functionality
    function createFolder() {
        const folderName = prompt("Enter folder name:");

        if (folderName) {
            // Use fetch API to create a folder on the server (replace with actual endpoint)
            fetch(`http://localhost:3000/create-folder?name=${folderName}`, {
                method: "POST",
            })
                .then(response => response.json())
                .then(data => {
                    // Handle server response, e.g., update file list
                    console.log(data);
                    displayFileList();
                })
                .catch(error => console.error("Error creating folder:", error));
        }
    }

    // Attach event listeners to buttons or triggers
    document.getElementById("upload-btn").addEventListener("click", () => fileInput.click());
    document.getElementById("create-folder-btn").addEventListener("click", createFolder);
});
