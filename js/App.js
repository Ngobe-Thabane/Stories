import ImageUploader from "./imageUploader.js";


let uploader = new ImageUploader();

const uploadBox = document.getElementById('upload-box');
const fileInput = document.getElementById('file-input');
const createStory = document.getElementById('create-story');
const preview = document.getElementById('preview');
const previewContainer = document.querySelector('.upload-container');
const addMoreButton = document.getElementById('add-more-btn');

createStory.addEventListener('click', ()=>{
    uploader.saveStory();
    uploader = new ImageUploader();
})

preview.addEventListener('click', ()=>{
    uploader.previewStory();
})

uploadBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadBox.style.border = '2px dashed #007bff';
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.style.border = '2px dashed #ddd';
});

uploadBox.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadBox.style.border = '2px dashed #ddd';
    
    const files = event.dataTransfer.files;
    uploader.handleFiles(files);
});

// Trigger input click on box click
addMoreButton.addEventListener('click', ()=>{
    fileInput.click();
    previewContainer.style.display = 'block';
})

uploadBox.addEventListener('click', () => {
    fileInput.click();
});


// Handle files selected or dragged in
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    uploader.handleFiles(files);
});