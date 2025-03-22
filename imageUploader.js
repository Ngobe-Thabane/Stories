
export default class ImageUploader{

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
          this.#storeImageInLocalStorage(base64Image);
      };
      
      reader.onerror = (error) =>{
          console.error("Error while reading the file:", error);
      };
      
      reader.readAsDataURL(file); // This converts the image file to a base64 string
  }
  
  // to store base64 image in local storage
  #storeImageInLocalStorage(base64Image) {

      if (typeof(Storage) !== "undefined") {
          localStorage.setItem('uploadedImage', base64Image);
      }
  }
  
  // to retrieve the image from local storage
  getImageFromLocalStorage() {
      const storedImage = localStorage.getItem('uploadedImage');
      return storedImage; 
  }
}


