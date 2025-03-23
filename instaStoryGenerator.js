

export default class InstaStoryGenerator{

  #stories;
  
  constructor(story){
    this.#stories = story.storyContent;
    this.#countStories();
    this.#displayStoryForDuration(0, this.#stories[0]);
  }

  #displayStoryForDuration(storyIndex, story, duration = 3000) {
    
    const storieCard = document.querySelector('.storie-card');

    storieCard.style.display = 'block';
    storieCard.style.backgroundImage = `url(${story})`;

    this.#updateProgressBar(storyIndex,duration);
    setTimeout(()=> this.#nextStory(storyIndex+1), duration);
  }

  #countStories(){

    const progressBarContainer = document.querySelector('.storie-bars');
    progressBarContainer.innerHTML = '';

    this.#stories.forEach((story, index)=>{

      const progressBar = document.createElement('div');
      progressBar.className = 'bar';
      progressBar.id = index;
      progressBarContainer.appendChild(progressBar);

    })  
  }

  #updateProgressBar(id,duration){
  
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
  
  #progress(storyBar){

    const progresBar = document.createElement('div');

    progresBar.className = 'progress-bar';
    storyBar.innerHTML = '';
    storyBar.appendChild(progresBar);

    return progresBar;
  }
  
  #nextStory(storyIndex) {

    if(storyIndex < this.#stories.length){
      this.#displayStoryForDuration(storyIndex, this.#stories[storyIndex]);
    }
    else{
      const storieCard = document.querySelector('.storie-card');
      storieCard.style.display = 'none';
    }
  }
}


