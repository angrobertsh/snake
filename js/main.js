const View = require('./snake-view');
let highscores = JSON.parse(localStorage.getItem('snake'));

$( () => {
  let view = new View($('.snake'));
  renderScores();
  $(document).keypress((e) => {
    if (event.keyCode === 32) {
      pauseGame(view);
    } else if (event.keyCode === 114){
      clearGame(view);
      view = new View($('.snake'));
      renderScores();
    }
  });
  // annoying workaround for weird browser behavior - button is activated by space/pause
  $('.reset').on('keyup', function(e) {
    e.preventDefault();
  });

  $('.reset').on('click', function(e) {
    e.preventDefault();
    gameOver(view);
    view = new View($('.snake'));
    renderScores();
  });

});

function renderScores() {
  $('.scoreboard').html("");
  var sortable = [];
  for (var name in highscores) {
    sortable.push([name, highscores[name]]);
  }
  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });
  sortable.forEach(score => {
    $('.scoreboard').append(`<div class="personal-score">${score[0]}:  ${score[1]}</div>`);
  });
}

function gameOver(view) {
  clearGame(view);
  let name = prompt("Enter Your Name", "");
  if (highscores) {
    let score = highscores[name];
    if (typeof score !== 'undefined') {
      if (view.score > score) {
        highscores[name] = view.score;
      }
    } else {
      highscores[name] = view.score;
    }
  } else {
    highscores = {};
    highscores[name] = view.score;
  }
  localStorage.setItem('snake', JSON.stringify(highscores));
  renderScores();
}

function pauseGame(view) {
  if (view.isPaused) {
    view.resume();
  } else {
    view.quit();
  }
}

function clearGame(view) {
  view.quit();
  $('.snake').html("");
}
