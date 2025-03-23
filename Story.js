
export default class Story{
  #id;
  #storyContent = [];
  #timestamp = new Date().getTime();
  #expirationTime;
  
  constructor(){
    this.id = `${this.#timestamp}-${Math.random().toString(36).substring(2, 10)}`;
  }

  getStory(){
    return {
      storyContent : this.#storyContent,
      id: this.id
    }
  }
  
  addStoryContent(content){
    this.#storyContent.push(content);
  }
}