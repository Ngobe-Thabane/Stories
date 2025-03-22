/**
 * Function to create a new story thumbnail pic
 * @param {*} content 
 */

export function createStoryThumbnail(thumbail) {

  const storyThumbnail = document.createElement('img');
  storyThumbnail.className = 'pic';
  storyThumbnail.src = thumbail;

  storyThumbnail.addEventListener('click', (event) => {displayStoryForDuration(event.target.src)});
  countStories();
  return storyThumbnail;

}

/**
 * Function to display a specific story for a given duration (in this case, 3 seconds)
 * @param {*} story 
 * @param {*} duration 
 */

function displayStoryForDuration(story, duration = 3000) {

  const storieCard = document.querySelector('.storie-card');
  const storyContent = document.createElement('img');
  storyContent.src = story;
  storyContent.className = 'view-image';

  storieCard.appendChild(storyContent);
  updateProgressBar(duration);
  setTimeout(removeStory, duration);
}

function countStories(){

  const progressBarContainer = document.querySelector('.storie-bars');
  const progressBar = document.createElement('div');
  progressBar.className = 'bar';
  progressBarContainer.appendChild(progressBar);

}

function updateProgressBar(duration){

  let width = 0;
  
  const barWidth = document.querySelector('.bar');
  const intarvalTime = 10; //update every 3 seconds;
  const incrementPerIntarval = (100/(duration/intarvalTime));
  const intarvalID = setInterval(progressBar, intarvalTime);

  function progressBar(){
    width += incrementPerIntarval;
    width >= 100 ? clearInterval(intarvalID) : barWidth.style.width = width+'%';
  }
}

/**
 * Function to remove a story after it's displayed
 * @param {*} story 
 */
function removeStory() {
  const storieCard = document.querySelector('.storie-card');
  storieCard.innerHTML = '';
}

/**
 *Function to add text overlay to a story 
 * @param {*} story 
 * @param {*} text 
 */
function addTextToStory(story, text) {
}

/**
 * Function to add an image to a story
 * @param {*} story 
 * @param {*} image 
 */
function addImageToStory(story, image) {

}

/**
 * Function to add a video to a story
 * @param {*} story 
 * @param {*} video 
 */
function addVideoToStory(story, video) {
}


/**
 * Function to schedule a story to appear at a particular time
 * @param {*} story 
 * @param {*} startTime 
 */
function scheduleStory(story, startTime) {

}

/**
 * Function to loop through multiple stories and display them sequentially
 * @param {*} stories 
 */
function loopStories(stories) {

}

