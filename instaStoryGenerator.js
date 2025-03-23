

export default class InstaStoryGenerator{

  #stories;
  #storieListDiv = document.querySelector('.storie-list');
  
  constructor(){

    const isStoriesAvailable = localStorage.getItem('stories');
    this.#stories = isStoriesAvailable ? JSON.parse(isStoriesAvailable) : [];
    this.#displayStorieThumbnails();

  }
  
  addStoryToLocalStorage(story){

    this.#stories.push(story);
    localStorage.setItem('stories', JSON.stringify(this.#stories));
    this.#displayStorieThumbnails();
  
  }

  #displayStorieThumbnails(){

    this.#storieListDiv.innerHTML = '';
    this.#stories.forEach((story)=>{
      const currentStory = JSON.parse(story);
      this.#storieListDiv.appendChild(this.#createStoryThumbnail(currentStory));
    });

    this.#countStories();
  }

  #createStoryThumbnail(story) {
  
    const storyThumbnail = document.createElement('img');
    storyThumbnail.className = 'pic action-elements';
    storyThumbnail.src = story.storyContent;
    storyThumbnail.id = story.id;
  
    storyThumbnail.addEventListener('click', (event) => {this.#displayStoryForDuration(event.target.id)});
    return storyThumbnail;
  }

  #getStory(id){

    return this.#stories.filter((story) => {
      return JSON.parse(story).id == id;
     })[0];
  }

  #displayStoryForDuration(id, duration = 3000) {

    const story = JSON.parse(this.#getStory(id));
    const storieCard = document.querySelector('.storie-card');

    storieCard.style.display = 'block';
    storieCard.style.backgroundImage = `url(${story.storyContent})`;

    this.#updateProgressBar(id.split('-')[0],duration);
    setTimeout(()=> this.#removeStory(story), duration);
  }

  #countStories(){

    this.#stories.forEach((story)=>{

      const currentStory = JSON.parse(story);
      const progressBarContainer = document.querySelector('.storie-bars');
      const progressBar = document.createElement('div');

      progressBar.className = 'bar';
      progressBar.id = currentStory.id.split('-')[0];
      progressBarContainer.appendChild(progressBar);

    })
  
  }

  #updateProgressBar(id,duration){
  
    let width = 0;
    
    const storyBar = document.getElementById(id);
    const progress = this.#progress(storyBar);
    
    const intarvalTime = 10; //update every 3 seconds;
    const incrementPerIntarval = (100/(duration/intarvalTime));
    const intarvalID = setInterval(progressBar, intarvalTime);
    
    function progressBar(){
      width += incrementPerIntarval;
      width >= 100 ? clearInterval(intarvalID) : progress.style.width = width+'%';
    }
  }
  
  #progress(storyBar){

    const progresBar = document.createElement('div');

    progresBar.className = 'progress-bar';
    storyBar.innerHTML = '';
    storyBar.appendChild(progresBar);

    return progresBar;
  }
  
  #removeStory(PrevStorystory) {

    let nextItem = this.#stories.findIndex((story)=>{
      return JSON.parse(story).id === PrevStorystory.id;
    });

    const nextStory = this.#stories[nextItem+1];

    if(nextStory !== undefined){
      this.#displayStoryForDuration(JSON.parse(nextStory).id);
    }else{
      const storieCard = document.querySelector('.storie-card');
      storieCard.style.display = 'none';
    }
  }
}


