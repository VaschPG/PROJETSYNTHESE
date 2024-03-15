class Exercise {
  bodyPart: string;
  equipment: string;
  gifUrl?: string;
  _id: number;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];

  constructor(
    bodyPart: string,
    equipment: string,
    gifUrl: string,
    _id: number,
    name: string,
    target: string,
    secondaryMuscles: string[],
    instructions: string[]
  ) {
    this.bodyPart = bodyPart;
    this.equipment = equipment;
    this.gifUrl = gifUrl;
    this._id = _id;
    this.name = name;
    this.target = target;
    this.secondaryMuscles = secondaryMuscles;
    this.instructions = instructions;
  }
}

export default Exercise;
