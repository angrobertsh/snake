const wall = new Audio('js/wall.mp3');
const ouch = new Audio('js/self.mp3');

class Snake {
  constructor() {
    this.direction = [-1,0];
    this.segments = [ new Coord([10,10]),new Coord([11,10]), new Coord([12,10]), new Coord([13,10]), new Coord([14,10]) ];
  }

  move(apples) {
    if(this.segments.length === 0){
      return;
    }
    let first = this.segments[0].clone();
    first.plus(this.direction);

    for(let i = 0; i < this.segments.length; i++)
    {
      if (this.segments[i].equals(first)) {
        ouch.play();
        alert("You Lose!");
        this.segments = [];
        return;
      }
    }

    if(first.isOutOfBounds()){
      wall.play();
      alert("You Lose!");
      this.segments = [];
      return;
    }

    let eat = false;
    apples.forEach( apple => {
      if(first.equals(apple)){
        $(apple.getID()).removeClass('apple');
        eat = apple;
      }
    });

    this.segments.unshift(first);
    if(!eat)
    {
      let oldSegment = this.segments.pop();
      $(oldSegment.getID()).removeClass('segment');
    }
    return eat;
  }


  turn(dir) {
    if (this.direction[0] === (dir[0] * -1) || this.direction[1] === (dir[1] * -1)) {
      return;
    }
    this.direction = dir;
  }
}

class Coord {
  constructor(pos) {
    this.pos = pos;
  }

  plus(pos) {
    this.pos[0] += pos[0];
    this.pos[1] += pos[1];
  }

  equals(coord) {
    let pos = coord.pos;
    return (this.pos[0] === pos[0] && this.pos[1] === pos[1]);
  }

  isOutOfBounds() {
    if(this.pos[0] < 0 || this.pos[0] >= 20 || this.pos[1] < 0 || this.pos[1] >= 20){
      return true;
    } else {
      return false;
    }
  }

  clone(){
    return new Coord(Array.from(this.pos));
  }

  getID(){
    return `#row${this.pos[0]}col${this.pos[1]}`;
  }

}

module.exports = {Snake, Coord};
