import InstaStoryGenerator from "./instaStoryGenerator.js";

export default class Stories{

  #stories;
  #storieListDiv = document.querySelector('.storie-list');

  constructor(){

    const isStoriesAvailable = localStorage.getItem('stories');
    this.#stories = isStoriesAvailable ? JSON.parse(isStoriesAvailable) : [];
    this.#clearUploadPage();
    this.#displayStorieThumbnails();
  }
  
  addStoryToLocalStorage(story){

    this.#stories.push(story);
    localStorage.setItem('stories', JSON.stringify(this.#stories));
    this.#displayStorieThumbnails(); 
  }

  #clearUploadPage(){

    if(this.#stories.length >= 1){
      document.querySelector('.upload-container').style.display = 'none';
      document.querySelector('.upload-btn').style.display = 'block';
    }
  }
  
  #displayStorieThumbnails(){

    this.#storieListDiv.innerHTML = '';

    this.#stories.forEach((story)=>{
      this.#storieListDiv.appendChild(this.#createStoryThumbnail(story));
    });
  }

  #getStory(id){
    return this.#stories.filter((story) => {
      return story.id == id;
     })[0];
  }

  #createStoryThumbnail(story) {
  
    const storyThumbnail = document.createElement('img');
    storyThumbnail.className = 'pic action-elements';
    storyThumbnail.src = story.storyContent[0].imageUrl;
    storyThumbnail.id = story.id;
  
    storyThumbnail.addEventListener('click', (event) => {
      const story = this.#getStory(event.target.id);
      new InstaStoryGenerator(story);
    });

    return storyThumbnail;
  }
}