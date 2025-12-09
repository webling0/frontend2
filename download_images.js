const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

const BASE_URL = 'https://modavenextjs.vercel.app';
const LOCAL_DIR = path.join(__dirname, 'public', 'images');

// Function to recursively walk through a directory
function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

// Function to download a file
function downloadFile(fileUrl, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        const request = https.get(fileUrl, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${fileUrl}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        });

        request.on('error', (err) => {
            fs.unlink(destPath, () => { }); // Delete the file async. (But we don't check the result)
            reject(err);
        });

        file.on('error', (err) => {
            fs.unlink(destPath, () => { });
            reject(err);
        });
    });
}

async function main() {
    console.log(`Scanning directory: ${LOCAL_DIR}`);

    if (!fs.existsSync(LOCAL_DIR)) {
        console.error(`Directory not found: ${LOCAL_DIR}`);
        return;
    }

    const filesToProcess = [];

    walkDir(LOCAL_DIR, (filePath) => {
        // Filter out system files like .DS_Store if needed, but for now we take all
        if (path.basename(filePath) === '.DS_Store') return;
        filesToProcess.push(filePath);
    });

    console.log(`Found ${filesToProcess.length} files.`);

    for (const filePath of filesToProcess) {
        // Get relative path from 'public' folder. 
        // filePath is like /Users/.../public/images/sub/file.jpg
        // We want /images/sub/file.jpg

        const relativePath = path.relative(path.join(__dirname, 'public'), filePath);
        // Ensure forward slashes for URL
        const urlPath = relativePath.split(path.sep).join('/');

        const fileUrl = `${BASE_URL}/${urlPath}`;

        try {
            console.log(`Downloading: ${fileUrl} -> ${filePath}`);
            await downloadFile(fileUrl, filePath);
            console.log(`✓ Success: ${urlPath}`);
        } catch (error) {
            console.error(`✗ Error downloading ${urlPath}: ${error.message}`);
        }
    }

    console.log('Done.');
}

main();
