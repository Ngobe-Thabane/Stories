import InstaStoryGenerator from "./instaStoryGenerator.js";
import Stories from "./Stories.js";
import Story from "./Story.js";


export default class ImageUploader{

  #stories = new Stories();
  #filePreview = document.getElementById('file-preview');
  #story;
  constructor(){
    this.#story = new Story();
  }

  // Function to preview files
  handleFiles(files) {
    for (let i = 0; i < files.length; i++) {

        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.#story.addStoryContent({imageUrl : e.target.result, name: file.name});
          this.showPreview();
        };
        
        reader.readAsDataURL(file);
    }
  }

showPreview(){

    this.#filePreview.innerHTML = '';
    const storyActions = document.querySelector('.story-actions');
    storyActions.style.display = this.#story.getStory().storyContent.length >= 1 ? 'flex' : 'none';

    this.#story.getStory().storyContent.forEach((story)=>{
      this.createImagePreview(story);
    })
  }    

  previewStory(){
    InstaStoryGenerator.displayStory(this.#story.getStory(), true);
  }

  saveStory(){
    this.#filePreview.innerHTML = '';
    document.querySelector('.upload-container').style.display = 'none';
    document.querySelector('.upload-btn').style.display = 'block';
    this.#stories.addStoryToLocalStorage(this.#story.getStory());
  }

  createImagePreview(story){
    
    const previewImageContainer = document.createElement('div');
    const imgElement = document.createElement('img');
    const fileName = document.createElement('span');
    const deleteButton = document.createElement('button');
    
    imgElement.src = story.imageUrl;
    fileName.textContent = story.name.split('.')[0];

    imgElement.classList.add('preview-image');
    fileName.classList.add('file-name');
    
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.id = story.id;

    deleteButton.addEventListener('click', (event)=>{
      this.#story.removeStory(event.target.id);
      this.showPreview();
    })

    previewImageContainer.appendChild(imgElement);
    previewImageContainer.appendChild(fileName);
    previewImageContainer.appendChild(deleteButton);

    this.#filePreview.appendChild(previewImageContainer);
    
  }
}


