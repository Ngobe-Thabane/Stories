
export default class Story{
  id;
  storyContent;
  #timestamp = new Date().getTime();
  #expirationTime;
  
  constructor(storyContent){
    this.storyContent = storyContent;
    this.id = `${this.#timestamp}-${Math.random().toString(36).substring(2, 10)}`;
  }
}