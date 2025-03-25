import Stories from "./Stories.js";


export default class InstaStoryGenerator{

  static #storyList;
  static #preview = false;

  constructor(){}
  
  static displayStory(story, preview){

    const storieCard = document.querySelector('.storie-card');
    storieCard.innerHTML = ''
    storieCard.style.backgroundImage = 'none';

    InstaStoryGenerator.#storyList = story.storyContent;
    InstaStoryGenerator.#preview = preview;
    InstaStoryGenerator.#countStories();
    InstaStoryGenerator.#displayStoryForDuration(0, InstaStoryGenerator.#storyList[0]);  
  }
  
  static #displayStoryForDuration(storyIndex, story, duration = 3000) {
    
    const storieCard = document.querySelector('.storie-card');
    
    storieCard.style.display = 'block';
    storieCard.style.backgroundImage = `url(${story.imageUrl})`;

    InstaStoryGenerator.#updateProgressBar(storyIndex,duration);
    setTimeout(()=> InstaStoryGenerator.#nextStory(storyIndex+1), duration);
  }
  
  static #updateProgressBar(id,duration){
    
    let width = 0;
    
    const storyBar = document.getElementById(id);
    const progress = this.#progress(storyBar);
    
    const intarvalTime = 10; 
    const incrementPerIntarval = (100/(duration/intarvalTime));
    const intarvalID = setInterval(progressBar, intarvalTime);
    
    function progressBar(){
      width += incrementPerIntarval;
      width >= 100 ? clearInterval(intarvalID) : progress.style.width = width+'%';
    }
  }
  
  static #countStories(){
    const storieCard = document.querySelector('.storie-card');
    const storieBars = document.createElement('div');

    storieBars.className = 'storie-bars';
    storieCard.appendChild(storieBars);

    const progressBarContainer = document.querySelector('.storie-bars');
    progressBarContainer.innerHTML = '';

    InstaStoryGenerator.#storyList.forEach((story, index)=>{

      const progressBar = document.createElement('div');
      progressBar.className = 'bar';
      progressBar.id = index;
      progressBarContainer.appendChild(progressBar);

    })  
  }
  
  static #progress(storyBar){

    const progresBar = document.createElement('div');

    progresBar.className = 'progress-bar';
    storyBar.innerHTML = '';
    storyBar.appendChild(progresBar);

    return progresBar;
  }
  
  static #nextStory(storyIndex) {

    if(storyIndex < InstaStoryGenerator.#storyList.length){
      InstaStoryGenerator.#displayStoryForDuration(storyIndex, InstaStoryGenerator.#storyList[storyIndex]);
    }
    else{
      if(!InstaStoryGenerator.#preview) Stories._nextStoryAvaiable();
    }
  }
}


