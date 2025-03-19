const storieListDiv = document.querySelector('.storie-upload');

document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', (event) => {

  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      localStorage.setItem('storiePic', base64String);
      createPicDiv();
    };
    reader.readAsDataURL(file);
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

  const viewPicDiv = document.querySelector('.stories');
  // const file = event.target.src;
  const viewPic = document.createElement('div');
  viewPic.style.height = '5px';
  viewPic.style.width =  1+'%';
  viewPic.style.backgroundColor = 'black'
  viewPicDiv.appendChild(viewPic);

  setTimeout(()=>removeImage(viewPic), 3000, 10);
}

function removeImage(width){
  for(let i = 0; i <= 100; i+=10){
    width.style.width = i + "%";
  }
}