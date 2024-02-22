class Exercise{
  id: number;
  name: string;
  equipment: string;
  gifurl?: string;
  bodypart?: string;
  instructions?: string[];

  constructor(id:number, name: string, equipment: string, gifurl?: string, bodypart?: string,  instructions?: string[]){
    this.id = id;
    this.name = name;
    this.equipment = equipment;
    this.gifurl = gifurl;
    this.bodypart = bodypart;
    this.instructions = instructions;
  }
}

export default Exercise;