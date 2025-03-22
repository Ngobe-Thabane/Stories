import Story from "./Story.js";
import InstaStoryGenerator from "./instaStoryGenerator.js";


export default class ImageUploader{

  #stories = new InstaStoryGenerator();
  constructor(){}

  // to handle image upload
  uploadImage(inputElement) {
  
      // Check if a file is selected
      if (inputElement.files && inputElement.files[0]) {
          const file = inputElement.files[0];
          this.#convertImageToBase64(file);
      }
  }
  
  // to convert image to base64 
  #convertImageToBase64(file) {
      const reader = new FileReader();
      
      reader.onloadend = ()=> {
           const base64Image = reader.result;  
           const story = new Story(base64Image);
           this.#stories.storeStory(JSON.stringify(story));
      };
      
      reader.onerror = (error) =>{
          console.error("Error while reading the file:", error);
      };
      
      reader.readAsDataURL(file); // This converts the image file to a base64 string

  }
  
}


