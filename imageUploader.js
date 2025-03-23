import Stories from "./Stories.js";
import Story from "./Story.js";


export default class ImageUploader{

  #stories = new Stories();
  constructor(){}

  uploadImage(inputElement) {
  
      // Check if a file is selected
      if (inputElement.files && inputElement.files[0]) {
          const file = inputElement.files[0];
          this.#convertImageToBase64(file);
      }
  }
  
  #convertImageToBase64(file) {
      const reader = new FileReader();
      
      reader.onloadend = ()=> {
        const base64Image = reader.result;  
        const story = new Story();
        story.addStoryContent(base64Image);
        this.#stories.addStoryToLocalStorage(story.getStory());
      };
      
      reader.onerror = (error) =>{
          console.error("Error while reading the file:", error);
      };
      
      reader.readAsDataURL(file); // This converts the image file to a base64 string
  }
}


