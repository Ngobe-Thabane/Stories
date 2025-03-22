import ImageUploader from "./imageUploader.js";


const uploader = new ImageUploader();

document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('file-upload').click();
});


document.getElementById('file-upload').addEventListener('change', (event) => {
  uploader.uploadImage(event.target);
});