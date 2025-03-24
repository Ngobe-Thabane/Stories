
export default class Story{
  #id;
  #storyContent = [];
  #timestamp = new Date().getTime();
  #expirationTime;
  
  constructor(){
    this.id = this.#createId();
  }

  getStory(){
    return {
      storyContent : this.#storyContent,
      id: this.id
    }
  }

  addStoryContent(content){
    content.id = this.#createId();
    this.#storyContent.push(content);
  }
  
  removeStory(id){
    const content = this.#storyContent.findIndex((content)=>{ 
      return content.id === id;
    })
    this.#storyContent.splice(content, 1);
  }

  #createId(){
    return `${this.#timestamp}-${Math.random().toString(36).substring(2, 10)}`;
  }
}