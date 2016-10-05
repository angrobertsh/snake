const Coord = require('./snake').Coord;

class Board {

  constructor(snake) {
    this.snake = snake;
    this.apples = [];
    this.setup($('.snake'));
    this.render();
  }

  setup($root) {
    $root.append('<div class="scoreboard"></div>');
    for (let i = 0; i < 20;i ++) {
      for (let j = 0; j < 20; j ++) {
        $root.append(`<div class="grid-item" id="row${i}col${j}"></div>`);
      }
    }
  }

  render($root) {
    this.snake.segments.forEach((segment) => {
      $(segment.getID()).addClass('segment');
    });
    this.apples.forEach((apple) => {
      $(apple.getID()).addClass('apple');
    });
  }

  generateApple() {
    let coord = this.randomCoord();
    let error = true;
    let view = this;
    while (error) {
      error = false;
      this.snake.segments.forEach(segment => {
        if (segment.equals(coord)) {
          error = true;
          coord = view.randomCoord();
        }
      });
    }
    this.apples.push(coord);
  }

  randomCoord() {
    let x = Math.floor(Math.random()*20);
    let y = Math.floor(Math.random()*20);
    let pos = [x,y];
    return new Coord(pos);
  }

}

module.exports = Board;
