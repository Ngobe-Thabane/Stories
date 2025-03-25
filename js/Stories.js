import InstaStoryGenerator from "./instaStoryGenerator.js";

export default class Stories{

  static #stories;
  static #storieListDiv = document.querySelector('.storie-list');
  static _currentStory = 0;

  constructor(){

    const isStoriesAvailable = localStorage.getItem('stories');
    Stories.#stories = isStoriesAvailable ? JSON.parse(isStoriesAvailable) : [];
    Stories.#clearUploadPage();
    Stories.#displayStorieThumbnails();
  }
  
  addStoryToLocalStorage(story){

    Stories.#stories.push(story);
    localStorage.setItem('stories', JSON.stringify(Stories.#stories));
    Stories.#displayStorieThumbnails(); 
  }

  static #clearUploadPage(){

    if(Stories.#stories.length >= 1){
      document.querySelector('.upload-container').style.display = 'none';
      document.querySelector('.upload-btn').style.display = 'block';
    }
  }
  
  static #displayStorieThumbnails(){

    Stories.#storieListDiv.innerHTML = '';

    Stories.#stories.forEach((story)=>{
      Stories.#storieListDiv.appendChild(Stories.#createStoryThumbnail(story));
    });
  }

  static #getStory(id){
    return Stories.#stories.filter((story) => {
      return story.id == id;
     })[0];
  }

  static #setCurrentStory(storyId){
    Stories._currentStory = Stories.#stories.findIndex((story)=>{
      return story.id === storyId;
    })
  }

  static next(){
    Stories._currentStory++;

    if(Stories._currentStory == Stories.#stories.length){
      Stories._currentStory = 0;
    }

    InstaStoryGenerator.displayStory(Stories.#stories[Stories._currentStory], true);
  }

  static prev(){
    Stories._currentStory--;
    if(Stories._currentStory < 0){
      Stories._currentStory = 0;
    }
    InstaStoryGenerator.displayStory(Stories.#stories[Stories._currentStory], true);
  }

  static _nextStoryAvaiable(){
    Stories._currentStory++;
    if(Stories._currentStory < Stories.#stories.length){
      InstaStoryGenerator.displayStory(Stories.#stories[Stories._currentStory], false);
    }
  }

  static #createStoryThumbnail(story) {
  
    const storyThumbnail = document.createElement('img');
    storyThumbnail.className = 'pic action-elements';
    storyThumbnail.src = story.storyContent[0].imageUrl;
    storyThumbnail.id = story.id;
  
    storyThumbnail.addEventListener('click', (event) => {

      const story = Stories.#getStory(event.target.id);
      document.querySelectorAll('.next-btn').forEach((btn)=> btn.style.display = 'block');
      Stories.#setCurrentStory(event.target.id);
      InstaStoryGenerator.displayStory(story, false);
    });

    return storyThumbnail;
  }
}