const Board = require('./board');
const Snake = require('./snake').Snake;
const phrases = [
  "Eve, please cover thineself, there are snakes about.",
  "I don't know what sin is!",
  "My missing rib hurts.",
  "This garden is too hot. Why can't we get some air conditioning?",
  "EVE COME EAT THIS DELICIOUS APPLE.",
  "I AM NICE SNEK.",
  "SHUT UP CHILDREN YOU'RE GIVING GOD A HEADACHE",
  "No, but, really, Eve, come try this apple. It's delish.",
  "I wish God would plant more quinoa.",
  "I can't wait for the next episode of Xena to come out",
  "Eve pls.",
  "Adam plx.",
  "Oh yah there's this neato bobeeto star that shows up in the morning but idk what its deal is.",
  "I sure hope our progeny don't suffer from massive floods caused by a vengeful father figure.",
  "Boop boop boop.",
  "I don't know what progeny are.",
  "My favorite part of the chicken is the nugget.",
  "God why are we not allowed to call you daddy?",
  "Don't call me daddy, it's weird and I can't tell you why. Also don't eat that apple",
  "God plz."
];
const audio = new Audio('js/eat.mp3');

class View {

  constructor ($el) {
    this.$el = $el;
    this.isPaused = false;
    $('.pause').css({display: "none"});
    this.snake = new Snake();
    this.board = new Board(this.snake);
    this.updateTurn = false;
    this.board.generateApple();
    this.score = 0;
    $('.score').html(this.score);
    $(document).on('keypress', this.handleKeyEvent.bind(this));
    this.interval = setInterval(this.step.bind(this), 100);
  }

  handleKeyEvent (event) {
    if (this.updateTurn) {
      return;
    }
    let code = event.keyCode;
    switch (code) {
      case 97:
        this.snake.turn([0,-1]);
        break;
      case 119:
        this.snake.turn([-1,0]);
        break;
      case 100:
        this.snake.turn([0,1]);
        break;
      case 115:
        this.snake.turn([1,0]);
        break;
      default:
    }
    this.updateTurn = true;
  }

  step() {
    let apple = this.snake.move(this.board.apples);
    if (apple) {
      let index = this.board.apples.indexOf(apple);
      let left = this.board.apples.slice(0,index);
      let right = this.board.apples.slice(index + 1);
      this.board.apples = [...left, ...right];
      this.eatApple();
    }
    this.board.render();
    this.updateTurn = false;
  }

  eatApple() {
    audio.play();
    this.board.generateApple();
    this.score += 10;
    $('.score').html(this.score);
    $('.phrase').html(phrases[Math.floor(Math.random() * 20)])
    .css({top: randomPercent(), left: randomPercent()});
  }

  quit() {
    clearInterval(this.interval);
    $('.pause').css({display: "block"});
    this.isPaused = true;
  }

  resume() {
    this.interval = setInterval(this.step.bind(this), 100);
    $('.pause').css({display: "none"});
    this.isPaused = false;
  }

}

function randomPercent() {
  let rand = Math.floor(Math.random() * 60)
  return `${rand}%`
}

module.exports = View;

// a = 97
// w = 119
// d = 100
// s = 115
