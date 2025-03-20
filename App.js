const storieListDiv = document.querySelector('.storie-upload');

document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', (event) => {

  const file = event.target.files[0];
  const numberOfStories = document.querySelector('.storie-bars');
  const bar = document.createElement('div');
  bar.className = 'bar-log';
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      localStorage.setItem('storiePic', base64String);
      createPicDiv();
    };
    reader.readAsDataURL(file);
    numberOfStories.appendChild(bar);
  }
});


function createPicDiv() {
  const picLocation = localStorage.getItem('storiePic');
  const pic = document.createElement('img');
  pic.className = 'pic';
  pic.src = picLocation;
  pic.addEventListener('click', displayImage);
  storieListDiv.appendChild(pic);
}

function displayImage(event){
  const picUrl = event.target.src;
  removeImage(picUrl);
}

let progressRate = 0;
function removeImage(picUrl) {
  const viewPicDiv = document.querySelector('.bar-log');
  const storieCard = document.querySelector('.storiecard');
  const pic = document.createElement('img');
  pic.src = picUrl;
  pic.className = 'view-image';
  viewPicDiv.classList.add('bar');
  storieCard.appendChild(pic);

  let width = 0;
  const duration = 3000; // 3 seconds
  const intervalTime = 10; // Update every 10ms
  const increment = (100 / (duration / intervalTime)); // Calculate increment per interval

  const intervalID = setInterval(progressBar, intervalTime);

  function progressBar() {

    width += increment;
    if (width >= 100) {
      clearInterval(intervalID);
      viewPicDiv.innerHTML = '';
    }
    viewPicDiv.style.width = width + '%';
  }
}
