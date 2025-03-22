import ImageUploader from "./imageUploader.js";
import { createStoryThumbnail } from './instaStoryGenerator.js';

const uploader = new ImageUploader();
const storieListDiv = document.querySelector('.storie-upload');

document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', (event) => {
  uploader.uploadImage(event.target);
  createPicDiv();
});


function createPicDiv() {
  const picLocation = uploader.getImageFromLocalStorage();
  storieListDiv.appendChild(createStoryThumbnail(picLocation));

}
